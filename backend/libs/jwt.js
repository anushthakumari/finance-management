const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports.generateToken = ({ id, email }) => {
	const privateKey = process.env.TOKEN_KEY;
	return jwt.sign({ id, email }, privateKey, { expiresIn: "6h" });
};

module.exports.verifyToken = (token) => {
	try {
		const privateKey = process.env.TOKEN_KEY;
		return jwt.verify(token, privateKey);
	} catch (err) {
		throw new ErrorResponse("Authorization failed!", 401);
	}
};
