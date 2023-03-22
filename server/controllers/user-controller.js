require('dotenv').config({path: '../.env'});
const userService = require('../service/user-service');


class UserController {
    async signUp(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.signUp(email, password);
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true});

            res.send(userData)
        } catch (e) {
            console.log("signUp error " + e)
            res.status(400).send(`signUp error ${e}`);
        }
    }

    async signIn(req, res, next) {

    }

    async signOut(req, res, next) {

    }

    async activateAccount(req, res, next) {
        try {
            const link = req.params.link;

            const user = await userService.activateAccount(link);
            res.redirect('http://' + process.env.CLIENT_URL);

        } catch(e) {
            throw new Error("UController error " + e);
        }

    }
}

module.exports = new UserController();