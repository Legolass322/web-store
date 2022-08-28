const uuid = require('uuid')
const path = require('path')
const { nextTick } = require('process')
const ApiError = require('../error/ApiError.js')
const {Product} = require('../models/models.js')

class ProductController {
    async create(req, res, next) {
        try {
            const {
                name, 
                description,
                price, 
                brandId, 
                typeId,
                info
            } = req.body
            const {img} = req.file
            const fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            const product = await Product.create({
                name,
                description,
                price,
                brandId,
                typeId,
                img: fileName
            })
    
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
}

module.exports = new ProductController()