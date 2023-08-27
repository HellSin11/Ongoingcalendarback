const {HttpError} = require("http-errors");
const tokenService = require('../services/token-service.js')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        if (!accessToken) {
            return next(HttpError.Unauthorized());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(HttpError.Unauthorized());
        }
        req.user = userData;
        next();
    } catch (e) {
        res.json({message: 'User is not auth'})
    }
}