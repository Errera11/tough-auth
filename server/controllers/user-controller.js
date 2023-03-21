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

    async activationLink(req, res, next) {

    }
}

module.exports = new UserController();