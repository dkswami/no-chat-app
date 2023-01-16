const Message = require('../models/messageModel');

module.exports.addMessage = async (req, res, next) => {
	try {
		const { to, from, message } = req.body;
		const response = await Message.create({
			message: { text: message },
			users: [to, from],
			sender: from
		});
		if(response) {
			return res.json({ message: 'Message saved to database'});
		} else {
			return res.json({ message: 'Failed to save message to database'})
		}
	} catch(error) {
		next(error);
	}
}

module.exports.getMessages = async (req, res, next) => {
	try {
		const { to, from } = req.body;
		const allMessages = await Message.find({
			users: {
				$all: [to, from]
			}
		}).sort({ updatedAt: 1 }); //1 for ascending and -1 for descending

		const updatedMessages = allMessages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text
			};
		});
		res.json(updatedMessages)
	} catch (error) {
		next(error);
	}
}