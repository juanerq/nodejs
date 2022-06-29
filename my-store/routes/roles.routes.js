const express = require('express')
const { listRoles, createRole, deleteRole } = require('../controllers/roles.controller.js')

const { validateIdSchema, idRequiredSchema } = require('../schemas/list.schema.js')
const validatorHandler = require('../middlewares/validator.handler.js')

const router = express.Router()

router.route('/')
  .post(createRole)

router.route('/:id?')
  .get(validatorHandler(validateIdSchema), listRoles)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteRole)

module.exports = router
