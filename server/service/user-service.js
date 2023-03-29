require('dotenv').config();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const User = require('../models/user-model')
const sendMailService = require('../service/mail-service')
const tokenService = require('../service/token-service')

const UserDto = require('../dto/user-dto');
const ApiError = require("../exceptions/api-error");

class UserService {

    async signUp(email, password) {
        try {
            const user = await User.findOne({email});
            if(user) throw ApiError.BadRequest("UService: user already exists " + email);

            const hashedPassword = await bcrypt.hash(password, 3);

            const activationLink = uuid.v4();

            const newUser = await User.create({email, password: hashedPassword, activationLink});

            await sendMailService.sendActivationLink(newUser.email, process.env.API_URL + '/actLink/' + activationLink);

            const userData = new UserDto(newUser);

            const tokens = tokenService.createTokens({...userData})
            await tokenService.saveTokens(userData.id, tokens.refreshToken);

            return {...tokens, user: userData};
        } catch(e) {
            console.log(e);
        }
    }

    async activateAccount(activationLink) {
        try {
            const user = await User.findOne({activationLink});

            if(!user) throw ApiError.BadRequest('User not found');
            user.isActivated = true;
            await user.save();
            return user;
        } catch(e) {
            console.log(e);
        }
    }

    async signIn(email, password) {
        try {
            const userData = await User.findOne({email});
            if(!userData) throw ApiError.BadRequest("User not found");

            const result = await bcrypt.compare(password, userData.password);

            if(!result) throw ApiError.BadRequest("Invalid email or password");

            const userDto = new UserDto(userData);
            const tokens = tokenService.createTokens({...userDto})

            await tokenService.saveTokens(userData.id, tokens.refreshToken);

            return {...tokens, user: userData};
        } catch(e) {
            console.log(e);
        }
    }

    async signOut(token) {
        try {
            const data = await tokenService.removeToken(token);
            if(!data) throw ApiError.UnauthorizedError();
        } catch(e) {
            console.log(e);
        }

    }

    async refreshToken(token) {
        try {

            if(!token) throw ApiError.UnauthorizedError();

            const userData = tokenService.verifyRefreshToken(token);
            const userToken = await tokenService.findToken(token)


            if(!userData || !userToken) throw ApiError.UnauthorizedError();

            const user = await User.findById(userData.id);
            const userDto = new UserDto(user);
            const tokens = tokenService.createTokens({...userDto});

            tokenService.saveTokens(userDto.id, tokens.refreshToken);

            return tokens;
        } catch(e) {
            console.log(e);
        }
    }

    async getUsers() {
        const user = await User.findOne();
        return user;
    }
}

module.exports = new UserService();