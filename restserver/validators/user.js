const { check } = require('express-validator')

const { existsEmail, isRoleValid, existsUserById } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')

const validateCreateUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be more than 6 characters').isLength({ min: 6 }),
  check('email', 'This email is invalid').isEmail(),
  check('email').custom( existsEmail ),
  // check('role', 'This role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isRoleValid ),
  validateFields
]

const validateUpdateUser = [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsUserById ),
  check('role').custom( isRoleValid ),
  validateFields
]

const validateReqGet = [
  check('from', 'Query From is not a number').optional().isNumeric(),
  check('limit', 'Query limit is not a number').optional().isNumeric(),
  validateFields
]

const validateDeleteUser = [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsUserById ),
  check('db', 'Query db is not a boolean').optional().isBoolean(),
  validateFields
] 

module.exports = { 
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
  validateReqGet
}