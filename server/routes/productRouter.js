const Router = require('express')
const router = new Router()

const productController = require('../controllers/productController.js')

router.post('/', checkRole(process.env.ROLE_ADMIN), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

module.exports = router