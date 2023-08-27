const jwt = require('jsonwebtoken')
const tokenModel = require('../models/Token.js')


class TokenService {

    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
            return userData;
        } catch (e) {
            return null;
        }
    }

    generateAccessToken = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: '30m'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '30d'
        });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken (refreshToken) {
        const token = await tokenModel.deleteOne({refreshToken});
        return token;
    }

    async findToken (refreshToken) {
        const token = await tokenModel.findOne({refreshToken});
        return token;
    }

}

module.exports = new TokenService();