const router = require('express').Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const { login, googleSignIn } = require('../controllers/auth.controller.js')

router.route('/login')
  .post([
    check('email', 'Email is required').isEmail().not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
  ], login )

router.route('/google')
  .post([
    check('id_token', 'id_token is required').not().isEmpty(),
    validateFields
  ], googleSignIn )

module.exports = router