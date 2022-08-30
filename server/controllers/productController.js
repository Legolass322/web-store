const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError.js')
const {Product, ProductInfo} = require('../models/models.js')

class ProductController {
    async create(req, res, next) {
        try {
            let {
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

            if (info) {
                info = JSON.parse(info)
                info.forEach(item => {
                    ProductInfo.create({
                        title: item.title,
                        description: item.description,
                        product_id: product.id
                    })
                })
            }            
    
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brand_id, type_id, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let products
        if (!brand_id && !type_id) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brand_id && !type_id) {
            products = await Product.findAndCountAll({where: {brand_id}, limit, offset})
        }
        if (!brand_id && type_id) {
            products = await Product.findAndCountAll({where: {type_id}, limit, offset})
        }
        if (brand_id && type_id) {
            products = await Product.findAndCountAll({where: {brand_id, type_id}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{
                model: ProductInfo,
                as: 'info'
            }]
        })
        return res.json(product)
    }
}

module.exports = new ProductController()