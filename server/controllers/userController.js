const ApiError = require('../error/ApiError.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models.js')

const generateJWT = (id, email, roles) => {
    return jwt.sign(
        {id: id, email, roles},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async signup(req, res, next) {
        const {email, password, roles} = req.body
        if (!email || !password) {  // todo: validation
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, process.env.PASSWORD_HASHING_TIMES || 5)
        const user = await User.create({
            email,
            roles,
            password: hashPassword
        })
        await Cart.create({user_id: user.id})
        const token = generateJWT(user.id, user.email, user.roles)
        return res.json({token})
    }

    async signin(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('No such user'))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }
        const token = generateJWT(user.id, user.email, user.roles)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJWT(req.user.id, req.user.email, req.user.roles)
        return res.json({token})
    }
}

module.exports = new UserController()
