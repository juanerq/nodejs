const { check } = require('express-validator')
const { validateReqGet } = require('./user')
const { validateFields, validateJWT, isAdminRole } = require('../middlewares')
const { existsProductById, existsProductName, existsCategoryById } = require('../helpers/db-validators')

const validateCreateProduct = [
  validateJWT,
  check('name', 'Name is required').notEmpty().not().isNumeric(),
  check('category', 'It is not a mongo id').isMongoId(),
  check('category').custom( existsCategoryById ),
  // check('category', 'Category is required').notEmpty().not().isNumeric(),
  check('price', 'The price must be a number').isNumeric().not().isString(),
  validateFields
]

const validateGetProductById = [
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsProductById ),
  validateFields
]

const validateUpdateProduct = [
  validateJWT,
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsProductById ),
  check('name', 'Name is required').optional().notEmpty().not().isNumeric(),
  check('name').optional().custom( existsProductName ),
  check('category', 'Category is required').optional().isMongoId(),
  check('category').optional().custom( existsCategoryById ),
  check('price', 'The price must be a number').optional().isNumeric().not().isString(),
  validateFields
]

const validateDeleteCategory = [
  validateJWT,
  isAdminRole,
  check('id', 'Invalid id').isMongoId(),
  check('id').custom( existsProductById),
  check('db', 'Query db is not a boolean').optional().isBoolean(),
  validateFields
]

module.exports = {
  validateCreateProduct,
  validateReqGet,
  validateGetProductById,
  validateUpdateProduct,
  validateDeleteCategory
}