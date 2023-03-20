const brypt = require('bcrypt');
const uuid = require('uuid');
const User = require('../models/user-model')
const sendMailService = require('../service/mail-service')
const tokenService = require('../service/token-service')
const userDto = require('../dto/user-dto');

class UserService {
    async signUp(email, password) {
        const user = await User.findOne(email);
        if(user) throw new Error("UService: user already exists " + email);

        const hashedPassword = await brypt(password, 3);
        const newUser = await User.create({email, hashedPassword});
        const actLink = uuid.v4();
        await sendMailService(newUser.email, actLink);
        const userData = new UserDto(newUser);

        const tokens = tokenService({...userData})
        await tokenService.saveTokens(userData.id, tokens.refreshToken);

        return {...tokens, user: userData};
    }
}

module.exports = new UserService();