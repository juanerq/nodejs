const validateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt')
const validateRoles = require('../middlewares/validate-roles')
const validateFileUpload = require('./validate-file')
const validateCollection = require('./validate-collection')

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload,
    ...validateCollection
}