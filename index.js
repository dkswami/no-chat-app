const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
require('dotenv').config();

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", messageRoutes);
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
//deployment

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
mongoose.connect(process.env.MONGO_URL, connectionParams)
	.then(() => {
		console.log('Connected to the database ')
	})
	.catch((err) => {
		console.error(`Error connecting to the database. n${err}`);
	}
	)

const server = app.listen(process.env.PORT || 4000, () => {
	console.log(`Server is running on port: ${process.env.PORT || 4000}`);
});

const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
		//console.log("onlineUsers", userId);
	});
	//console.log("connected users",onlineUsers)

	socket.on("send-message", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {	// if user is online
			socket.to(sendUserSocket).emit("receive-message", data.message)
		}
	})

	socket.on("join-room", (roomId) => {
		console.log("roomId", roomId)
		socket.join(roomId);
	})

	socket.on("send-message-room", (data) => {
		console.log("room-data", data)
		socket.to(data.roomId).emit("receive-message-room", data.message);
	})
})
