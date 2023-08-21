const {
	addCategory,
	deletecats,
	getusercats,
} = require("../controllers/categories");

const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router
	.post("/add-cat", auth, addCategory)
	.get("/get-cat", auth, getusercats)
	.delete("/delete-cat/:id", auth, deletecats);

module.exports = router;
