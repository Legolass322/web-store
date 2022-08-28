const Router = require('express')
const router = new Router()

const productRouter = require('./productRouter.js')
const brandRouter = require('./brandRouter.js')
const typeRouter = require('./typeRouter.js')
const userRouter = require('./userRouter.js')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)

module.exports = router