const User = require('../models/users')
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt') 
const googleVerify = require('../helpers/google-verify')

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

const googleSignIn = async (req, res, next) => {
    const { id_token } = req.body

    try {
        const { email, name, img } = await googleVerify( id_token )
        let user = await User.findOne({ email })
        console.log(user);

        if(!user) {
            const data = {
                email,
                name,
                img,
                password: ':)',
                role: 'USER_ROLE',
                google: true
            }

            user = new User( data )
            await user.save()
        }

        if(!user.status) {
            return next({ msg: 'User blocked' })
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        next({ msg: 'Token cannot be verified' })
    }

}

module.exports = {
    login,
    googleSignIn
}