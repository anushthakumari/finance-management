const mongoose = require("mongoose");

const CrudModel = require("../utils/CrudModel");

const ExpenseModel = new CrudModel("expenses");

class BudgedtController extends CrudModel {
	constructor() {
		super("budgets");
	}

	add = async (req, res, next) => {
		const { title, amount, category } = req.body;
		const { id } = req.userData;

		const budget = {
			title,
			amount,
			user: id,
			category,
		};

		try {
			await super.add(budget);
			res.status(201).json({ message: "Added" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Server Error" });
		}
	};

	getuserbudgets = async (req, res, next) => {
		const budgets = await this.model
			.find({ user: req.userData.id })
			.populate("category")
			.sort({
				createdAt: -1,
			});

		res.status(200).json(budgets);
	};

	deletebudgets = (req, res) => {
		const { id } = req.params;
		this.model
			.findByIdAndDelete(id)
			.then((income) => {
				res.status(200).json({ message: "Deleted" });
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ message: "Server Error" });
			});
	};

	getBudgetOverview = async (req, res, next) => {
		const budgets = await this.model
			.find({ user: req.userData.id })
			.populate("category")
			.sort({
				createdAt: -1,
			});

		const overview_data = [];

		for (const bud of budgets) {
			const cat_expenses_sum = await ExpenseModel.model.aggregate([
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

			const cat_expenses = await ExpenseModel.model.find({
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
	};
}

module.exports = new BudgedtController();
