const UsersSchema = require("../models/UserModel");
const CategorySchema = require("../models/CategoryModel");
const asyncHandler = require("../utils/asyncHandler");
const { generateToken } = require("../libs/jwt");

exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, pass } = req.body;

	const d = await UsersSchema.findOne({ email });

	if (d) {
		res.status(400).send({ message: "User with this email already exists!" });
		return;
	}
	const user = UsersSchema({
		name,
		email,
		password: pass,
	});

	try {
		const data = await user.save();

		//creatinf default category
		const cats = CategorySchema({ title: "Health", user: data._id });
		const cats1 = CategorySchema({ title: "Groceries", user: data._id });

		//saving
		cats.save();
		cats1.save();

		//token
		const token = generateToken({ id: data._id, email });
		res.status(201).json({ message: "User Registered", token, name });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
});

exports.login = asyncHandler(async (req, res, next) => {
	const { email, pass } = req.body;

	const d = await UsersSchema.findOne({ email });

	if (d) {
		if (d.password === pass) {
			const token = generateToken({ id: d._id, email });
			res
				.status(200)
				.send({ message: "Logged in successfully!", token, name: d.name });
		} else {
			res.status(400).send({ message: "Invalid Credentials" });
		}

		return;
	}

	res.status(400).send({ message: "Invalid Credentials" });
});
