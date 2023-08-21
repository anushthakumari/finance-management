const mongoose = require("mongoose");

const UserModel = require("./UserModel");
const CatModel = require("./CategoryModel");

const BudgetModal = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 50,
		},
		amount: {
			type: Number,
			required: true,
			maxLength: 20,
			trim: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: UserModel.collection.name,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: CatModel.collection.name,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("budgets", BudgetModal);
