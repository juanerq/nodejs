const jwt = require('jsonwebtoken')

const generateJWT = ( uid = '' ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err)
                return reject('Could not generate token')
            resolve(token)
        })

    }) 
}

module.exports = {
    generateJWT
}