const userController = require('../controllers/user-controller')
const router = require('express').Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signUp',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    userController.signUp)

router.post('/signIn', userController.signIn)

router.post('/signOut', userController.signOut)

router.get('/actLink/:link', userController.activateAccount)

router.get('/refreshToken', userController.refreshToken)

router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;