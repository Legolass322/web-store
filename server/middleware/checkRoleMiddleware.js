const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return (req, res, next) =>  {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.state(401).json({message: 'User is unauthorized'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (!decoded.roles.includes(role)) {
                return res.status(403).json({message: 'Forbidden'})
            }
            req.user = decoded
            next()
        } catch (e) {
            return res.state(401).json({message: 'User is unauthorized'})
        }
    }
}