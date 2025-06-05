const getTokenFromRequest = (req) => {

    if (req.cookies?.jwt) {
        return req.cookies.jwt
    };

    if (req.headers?.authorization?.startsWith("Bearer")) {
        return req.headers.authorization.split(" ")[1];
    }

    return null;
};

module.exports = getTokenFromRequest;