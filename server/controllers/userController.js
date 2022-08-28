const ApiError = require('../error/ApiError.js')

class UserController {
    async signup(req, res) {

    }
    async signin(req, res) {
        
    }
    async check(req, res, next) {
        const {id} = req.query
        if (!id) {
            next(ApiError.badRequest('No userId'))
        }
    }
}

module.exports = new UserController()
