const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const CategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserModel.collection.name,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("categories", CategorySchema);
