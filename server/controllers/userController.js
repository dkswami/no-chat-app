const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userData = await User.findOne({ email });
		if (!userData) {
			return res.json({ message: "Email or password is incorrect", status: false });
		}
		const isPasswordValid = await bcrypt.compare(password, userData.password);
		if (!isPasswordValid) {
			return res.json({ message: "Email or password is incorrect", status: false });
		}
		const user = {
			_id: userData._id,
			name: userData.name,
			email: userData.email,
		}
		console.log(user)
		return res.json({ status: true, user});
	} catch (error) {
		next(error)
	}
}

module.exports.register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const emailCheck = await User.findOne({ email });
		if (emailCheck) {
			return res.json({ message: "Email already exists" })
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const userData = await User.create({
			name,
			email,
			password: hashedPassword
		});
		
		const user = {
			_id: userData._id,
			name: userData.name,
			email: userData.email,
		}
		console.log(user)
		return res.json({ status: true, user })
	} catch (error) {
		next(error)
	}
}

module.exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({ _id: { $ne: req.params.id }}).select([
			"name",
			"email",
			"_id",
		]);
		return res.json({ users });
	} catch (error) {
		next(error)
	}
}