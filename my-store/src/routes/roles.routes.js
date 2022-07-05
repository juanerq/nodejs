import express from 'express'
import { listRoles, createRole, deleteRole, updateRole } from '../controllers/roles.controller.js'

import { validateIdSchema, idRequiredSchema } from '../schemas/list.schema.js'
import validatorHandler from '../middlewares/validator.handler.js'

const router = express.Router()

router.route('/')
  .post(createRole)

router.route('/:id?')
  .get(validatorHandler(validateIdSchema), listRoles)

router.route('/:id')
  .put(updateRole)
  .delete(validatorHandler(idRequiredSchema), deleteRole)

export default router
