const CategorySchema = require("../models/CategoryModel");
const asyncHandler = require("../utils/asyncHandler");

exports.addCategory = asyncHandler(async (req, res, next) => {
	const { title } = req.body;
	const { id } = req.userData;

	const d = await CategorySchema.findOne({ title });

	if (d) {
		res.status(400).send({ message: "Category already exists!" });
		return;
	}
	const category = CategorySchema({
		title,
		user: id,
	});

	try {
		await category.save();
		res.status(201).json({ message: "Added" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server Error" });
	}
});

exports.getusercats = asyncHandler(async (req, res, next) => {
	const cats = await CategorySchema.find({ user: req.userData.id }).sort({
		createdAt: -1,
	});

	res.status(200).json(cats);
});

exports.deletecats = async (req, res) => {
	const { id } = req.params;
	CategorySchema.findByIdAndDelete(id)
		.then((income) => {
			res.status(200).json({ message: "Deleted" });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Server Error" });
		});
};
