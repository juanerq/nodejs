const { check } = require('express-validator')
const { validateFields, validateJWT, validateCollection } = require('../middlewares')
const { allowedCollections } = require('../helpers/db-validators')


const validatorUpdateImage = [
  check('id', 'Invalid id').isMongoId(),
  check('collection').custom( c => allowedCollections(c, ['users','products']) ),
  validateFields,
  validateCollection,
]

module.exports = {
  validatorUpdateImage
}