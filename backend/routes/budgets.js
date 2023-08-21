const {
	addBudget,
	deletebudgets,
	getuserbudgets,
} = require("../controllers/budgets");

const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
	.post("/add-budgets", auth, addBudget)
	.get("/get-budgets", auth, getuserbudgets)
	.delete("/delete-budgets/:id", auth, deletebudgets);

module.exports = router;
