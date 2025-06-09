const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 1;

const singToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP_IN });
};
const createSendToken = (user, statusCode, res) => {
    const token = singToken(user._id);


    delete user._id;
    delete user.id;

    res.status(statusCode).json({
        status: "success",
        data: user,
        jwt: token

    });
};

module.exports = { createSendToken };