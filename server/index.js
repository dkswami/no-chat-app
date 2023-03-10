const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
require('dotenv').config();

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running..");
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", messageRoutes);

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
		origin: "*",
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
		const sendToUserSocket = onlineUsers.get(data.to);
		if (sendToUserSocket) {	// if user is online
			socket.to(sendToUserSocket).emit("receive-message", data.message)
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
