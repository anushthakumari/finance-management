const BudgetModel = require("../models/BudgetModel");
const asyncHandler = require("../utils/asyncHandler");

exports.addBudget = asyncHandler(async (req, res, next) => {
	const { title, amount, category } = req.body;
	const { id } = req.userData;

	const budget = BudgetModel({
		title,
		amount,
		user: id,
		category,
	});

	try {
		await budget.save();
		res.status(201).json({ message: "Added" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
});

exports.getuserbudgets = asyncHandler(async (req, res, next) => {
	const budgets = await BudgetModel.find({ user: req.userData.id })
		.populate("category")
		.sort({
			createdAt: -1,
		});

	res.status(200).json(budgets);
});

exports.deletebudgets = async (req, res) => {
	const { id } = req.params;
	BudgetModel.findByIdAndDelete(id)
		.then((income) => {
			res.status(200).json({ message: "Deleted" });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		});
};
