const jwt = require('jsonwebtoken')
const User = require('../models/users')

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token')

    if(!token)
        return res.status(401).json({
            msg: 'Missing Token'
        })

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById( uid )

        if(!user) return res.status(401).json({
                            msg: 'Invalid Token - user not found in DB'
                        })

        if(!user.status) return res.status(401).json({
                            msg: 'Invalid Token - user with status false'
                        })

        req.user = user
        next()

    } catch (error) {
        console.error(error)

        res.status(401).json({
            msg: 'Invalid Token'
        })
    }
}

module.exports = {
    validateJWT
}