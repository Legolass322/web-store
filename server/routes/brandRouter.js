const Router = require('express')
const router = new Router()

const brandController = require('../controllers/brandController.js')
const checkRole = require('../middleware/checkRoleMiddleware.js')

// todo: delete
router.post('/', checkRole(process.env.ROLE_ADMIN), brandController.create)
router.get('/', brandController.getAll)

module.exports = router