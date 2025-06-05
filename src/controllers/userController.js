const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const { createSendToken } = require("../utils/createSendToken");

const createOneUser = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;
    const reqData = { name, email, password, passwordConfirm };

    const user = await User.create(reqData);

    const userToSend = {
        name: user.name,
        email: user.email
    };

    createSendToken(userToSend, 201, res);
});

const logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(AppError("Будь ласка відправте логін та пароль"), 400)
    };

    const user = await User.findOne({ email: email }).select("+password").select("-role");
    const result = await user.correctPassword(password, user.password);

    if (!user || !result) {
        return next(AppError("Невірні логін або пароль"), 401)
    };

    const userNoPasswortField = user.toObject();
    delete userNoPasswortField.password;

    createSendToken(userNoPasswortField, 200, res);
});

module.exports = { createOneUser, logIn };