const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const { createSendToken } = require("../utils/createSendToken");
const getTokenFromRequest = require("../utils/getTokenFromRequest")

const updateFavoriteJobs = catchAsync(async (req, res, next) => {
    const newLikedJobsArr = req.body.likedJobs;

    if (!newLikedJobsArr) {
        return next(AppError("Дані для оновлення відсутні"), 400)
    };

    const userId = getTokenFromRequest();

    if (!userId) {
        return next(new Error('Користувач не авторизований або ID користувача відсутній.'));
    };

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: { likedJobs: newLikedJobsArr } },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });

});


module.exports = { updateFavoriteJobs };