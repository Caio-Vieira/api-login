const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('authorization-token');

    if (!token) {
        return res.status(401).json({message: 'not access'})
    }

    try {
        const verifyToken = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verifyToken
        next()
    } catch (error) {
        return res.status(401).json({message: 'not access'})
    }
}