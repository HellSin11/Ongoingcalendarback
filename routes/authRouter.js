const Router = require('express');
const router = new Router();
const {check} = require('express-validator')
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js')
const roleMiddleware = require('../middleware/roleMiddleware.js')



router.post('/registration', [
    check('email', 'The username cannot be empty').notEmpty(),
    check('password', 'The password cannot be less than 8 characters and not more than 20')
        .isLength({min: 8, max:20}),
], authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/users', authMiddleware, authController.getUsers);

module.exports = router;
