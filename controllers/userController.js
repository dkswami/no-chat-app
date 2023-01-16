const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Email or password is incorrect", status: false });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.json({ message: "Email or password is incorrect", status: false });
		}
		delete user.password;
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
		const user = await User.create({
			name,
			email,
			password: hashedPassword
		});
		delete user.password;
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