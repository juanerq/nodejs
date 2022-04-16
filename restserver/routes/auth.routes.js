const router = require('express').Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const { login } = require('../controllers/auth.controller.js')

router.route('/login')
    .post([
        check('email', 'Email is required').isEmail().not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], login )

module.exports = router