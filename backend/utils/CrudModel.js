const UserModel = require("../models/UserModel");
const CategoryModel = require("../models/CategoryModel");
const IncomeModel = require("../models/IncomeModel");
const ExpenseModel = require("../models/ExpenseModel");
const BudgetModel = require("../models/BudgetModel");

class CrudModel {
	constructor(collection_name = "") {
		switch (collection_name) {
			case "users":
				this.model = UserModel;
				break;
			case "categories":
				this.model = CategoryModel;
				break;
			case "incomes":
				this.model = IncomeModel;
				break;
			case "expenses":
				this.model = ExpenseModel;
				break;
			case "budgets":
				this.model = BudgetModel;
				break;

			default:
				throw new Error("Invalid Collection Name Was Provided!");
		}
	}

	async add(data = {}) {
		const d = this.model(data);
		await d.save();
	}
}

module.exports = CrudModel;
