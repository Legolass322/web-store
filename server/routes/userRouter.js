const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/auth', authMiddleware, userController.check)

module.exports = router