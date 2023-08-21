const mongoose = require("mongoose");

const UserModel = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", UserModel);
