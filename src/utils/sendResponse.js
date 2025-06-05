const sendResponse = (user, statusCode, res, message, totalCount) => {

    res.status(statusCode).json({
        status: "success",
        ...(message && { message }),
        ...(user && {
            dataLength: totalCount ? totalCount : user.length,
            data: user
        })
    });
};

module.exports = sendResponse;