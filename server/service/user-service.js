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

            const activationLink = uuid.v4();

            const newUser = await User.create({email, password: hashedPassword, activationLink});

            await sendMailService.sendActivationLink(newUser.email, process.env.API_URL + '/actLink/' + activationLink);

            const userData = new UserDto(newUser);

            const tokens = tokenService.createTokens({...userData})
            await tokenService.saveTokens(userData.id, tokens.refreshToken);

            return {...tokens, user: userData};
        } catch(e) {
            throw new Error("UService error " + e);
        }
    }

    async activateAccount(activationLink) {
        try {
            const user = await User.findOne({activationLink});

            if(!user) throw new Error('User not found');
            user.isActivated = true;
            await user.save();
            return user;
        } catch(e) {
            throw new Error('MService error ' + e)
        }

    }

}

module.exports = new UserService();