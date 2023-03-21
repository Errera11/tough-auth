const userController = require('../controllers/user-controller')
const router = require('express').Router();

router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/signOut', userController.signOut)

router.get('/actLink:link', userController.activationLink)
router.get('/refreshToken', userController.activationLink)

module.exports = router;