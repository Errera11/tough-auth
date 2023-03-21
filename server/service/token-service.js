require('dotenv').config({path : '../.env'});

const jwt = require('jsonwebtoken');
const Token = require('../models/token-model');

class TokenService {
    createTokens(payload) {
        try {
            const secretAcc = String(process.env.SECRET_ACCESS_TOKEN);
            const secretRefr = String(process.env.SECRET_REFRESH_TOKEN);
            const accToken = jwt.sign(payload, secretAcc, {expiresIn: "30m"});
            const refreshToken = jwt.sign(payload, secretRefr, {expiresIn: "30d"});
            return {accToken, refreshToken};
        } catch(e) {
            throw new Error('TService ' + e)
        }

    }

    async saveTokens(userId, refreshToken) {
        const existingToken = await Token.findOne({userId});
        if (existingToken) {
            existingToken.refreshToken = refreshToken;
            return existingToken.save();
        }
        const token = await Token.create({user: userId, refreshToken: refreshToken});
        return token;
    }
}

module.exports = new TokenService();