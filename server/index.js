const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", messageRoutes );

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
