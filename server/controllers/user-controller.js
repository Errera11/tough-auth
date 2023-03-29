require('dotenv').config({path: '../.env'});
const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async signUp(req, res, next) {
        try {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                return next(ApiError.BadRequest("Invalid email or password", error.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.signUp(email, password);
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true});

            res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.signIn(email, password);
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true});

            res.json({...userData})
        } catch(e) {
            next(e);
        }
    }

    async signOut(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await userService.signOut(refreshToken)
            res.clearCookie('refreshToken');
        } catch(e) {
            next(e)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            const tokens = await userService.refreshToken(refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, {httpOnly: true});

            res.send(tokens)
        } catch(e) {
            next(e);
        }
    }

    async activateAccount(req, res, next) {
        try {
            const link = req.params.link;

            const user = await userService.activateAccount(link);
            res.redirect('http://' + process.env.CLIENT_URL);

        } catch(e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();