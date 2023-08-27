const User = require('../models/User.js');
const UserService = require('../services/user-service.js')
const {HttpError} = require("http-errors");




class authController {
    async registration (req, res, next) {
        try {
            const {fullName, email, password} = req.body;
            const userData = await UserService.registration(fullName, email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        }
        catch (e) {
            console.log(e.message);
            return res.json(400, {message: e.message});
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData)
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error', e});
        }
    }


    async activate(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {
            console.log('refresh!')
            console.log(req.cookies)
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30* 24 * 60 * 60 * 1000, httpOnly: true
            })
            res.json(userData)
        } catch (e) {
            res.json(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {

        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find();
            return res.json(users)
        } catch (e) {
            throw new Error('Error')
        }
    }
}

module.exports = new authController();