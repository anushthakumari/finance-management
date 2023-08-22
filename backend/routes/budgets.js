const budgetObj = require("../controllers/budgets");

const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
	.post("/add-budgets", auth, budgetObj.add)
	.get("/get-budgets", auth, budgetObj.getuserbudgets)
	.get("/get-budgets-overview", auth, budgetObj.getBudgetOverview)
	.delete("/delete-budgets/:id", auth, budgetObj.deletebudgets);

module.exports = router;
