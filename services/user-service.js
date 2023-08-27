const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service.js')
const tokenService = require('../services/token-service.js')
const UserDto = require('../dtos/user-dto.js')
const Role = require("../models/Role");
const {HttpError} = require("http-errors");


class UserService {
    async registration (fullName, email, password) {
        const candidate = await User.findOne({email});
        if (candidate) {
            throw new Error (`Користувач з поштою ${email} вже зареєстрований`)
        }
        const activationLink = uuid.v4();
        const salt = 5;
        const hashPassword = await bcrypt.hash(password, salt);
        const role = await Role.findOne({value: 'user'});
        const user = await User.create({fullName, email, password: hashPassword,
            isActivated: false, activationLink, roles: [role.value]});

        //await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user);
        const tokens = tokenService.generateAccessToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}

    }


    async login (email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User with this email was not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error ('Incorrect password')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateAccessToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}

    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw HttpError.Unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!tokenFromDb || !userData) {
            throw HttpError.Unauthorized();
        }
        const user = await User.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateAccessToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UserService();