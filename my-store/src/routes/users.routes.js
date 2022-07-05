import express from 'express'
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'

import { idRequiredSchema, filterSchema } from '../schemas/list.schema.js'
import { createUserSchema, updatedUserSchema } from '../schemas/user.schema.js'
import { isRoleValid } from '../helpers/db.validators.js'
import validatorHandler from '../middlewares/validator.handler.js'

const router = express.Router()

router.route('/')
  .post(validatorHandler(createUserSchema), isRoleValid, createUser)

router.route('/:id?')
  .get(validatorHandler(filterSchema), listUsers)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteUser)
  .put(validatorHandler(updatedUserSchema), isRoleValid, updateUser)

export default router
