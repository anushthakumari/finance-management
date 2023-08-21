const mongoose = require("mongoose");

const BudgetModel = require("../models/BudgetModel");
const ExpenseModel = require("../models/ExpenseModel");
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

exports.getBudgetOverview = asyncHandler(async (req, res, next) => {
	const budgets = await BudgetModel.find({ user: req.userData.id })
		.populate("category")
		.sort({
			createdAt: -1,
		});

	const overview_data = [];

	for (const bud of budgets) {
		const cat_expenses_sum = await ExpenseModel.aggregate([
			{
				$match: {
					category: mongoose.Types.ObjectId(bud.category._id),
				},
			},
			{
				$group: {
					_id: null,
					total_count: {
						$sum: "$amount",
					},
				},
			},
			{ $unset: ["_id"] },
		]);

		const cat_expenses = await ExpenseModel.find({
			category: bud.category._id,
		});

		const d = {
			title: bud.title,
			category: bud.category.title,
			amount: bud.amount,
			spent: cat_expenses_sum[0] ? cat_expenses_sum[0].total_count : 0,
			expenses: cat_expenses,
		};

		overview_data.push(d);
	}

	res.send(overview_data);
});
