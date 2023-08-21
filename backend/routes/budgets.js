const {
	addBudget,
	deletebudgets,
	getuserbudgets,
	getBudgetOverview,
} = require("../controllers/budgets");

const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
	.post("/add-budgets", auth, addBudget)
	.get("/get-budgets", auth, getuserbudgets)
	.get("/get-budgets-overview", auth, getBudgetOverview)
	.delete("/delete-budgets/:id", auth, deletebudgets);

module.exports = router;
