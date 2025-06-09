const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const getTokenFromRequest = require("../utils/getTokenFromRequest");

const updateFavoriteJobs = catchAsync(async (req, res, next) => {
    const newLikedJobsArr = req.body.likedJobs;

    if (!newLikedJobsArr) {
        return next(AppError("Дані для оновлення відсутні"), 400)
    };

    const token = getTokenFromRequest(req);

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

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
    ).populate({
        path: 'likedJobs',
        select: 'companyName positionName salary description industry'
    });

    if (!user) {
        return next(AppError('Користувача не знайдено.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });

});


module.exports = { updateFavoriteJobs };