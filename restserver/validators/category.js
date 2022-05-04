const { check } = require('express-validator')
const { validateReqGet } = require('./user')
const { validateFields, validateJWT, isAdminRole } = require('../middlewares')
const { existsCategoryById, existsCategoryName } = require('../helpers/db-validators')

const validateCreateCategory = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
]

const validateGetCategoryById = [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsCategoryById ),
  validateFields
]

const validateUpdateCategory = [
  validateJWT,
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsCategoryById ),
  check('name', 'Name is required').not().isEmpty(),
  check('name').custom( existsCategoryName ),
  validateFields
]

const validateDeleteCategory = [
  validateJWT,
  isAdminRole,
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsCategoryById),
  check('db', 'Query db is not a boolean').optional().isBoolean(),
  validateFields
]

module.exports = {
  validateReqGet,
  validateCreateCategory,
  validateGetCategoryById,
  validateUpdateCategory,
  validateDeleteCategory
}