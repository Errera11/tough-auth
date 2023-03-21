require('dotenv').config();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const User = require('../models/user-model')
const sendMailService = require('../service/mail-service')
const tokenService = require('../service/token-service')
const UserDto = require('../dto/user-dto');

class UserService {
    async signUp(email, password) {
        try {
            const user = await User.findOne({email});
            if(user) throw new Error("UService: user already exists " + email);

            const hashedPassword = await bcrypt.hash(password, 3);
            const newUser = await User.create({email, password: hashedPassword});
            const actLink = process.env.API_URL + '/actLink/' + uuid.v4();
            await sendMailService.sendActivationLink(newUser.email, actLink);
            const userData = new UserDto(newUser);

            const tokens = tokenService.createTokens({...userData})
            await tokenService.saveTokens(userData.id, tokens.refreshToken);

            return {...tokens, user: userData};
        } catch(e) {
            throw new Error("UService error " + e);
        }

    }
}

module.exports = new UserService();