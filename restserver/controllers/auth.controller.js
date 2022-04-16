const User = require('../models/users')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt') 

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if(!user)
            throw new Error('Username / Password are not correct - email')
        
        if(!user.status)
            throw new Error('Username / Password are not correct - status: false')

        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword)
            throw new Error('Username / Password are not correct - password')

        const token = await generateJWT(user.id)

        res.json({ 
            msg: 'Login ok',
            token
        })
    }catch(error) {
        next(error)
    }
}

module.exports = {
    login
}