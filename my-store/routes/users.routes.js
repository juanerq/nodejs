const express = require('express')
const { listUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller.js')

const { idRequiredSchema, filterSchema } = require('../schemas/list.schema.js')
const { createUserSchema, updatedUserSchema, validateRole } = require('../schemas/user.schema.js')
const validatorHandler = require('../middlewares/validator.handler.js')

const router = express.Router()

router.route('/')
  .post(validatorHandler(createUserSchema), validateRole, createUser)

router.route('/:id?')
  .get(validatorHandler(filterSchema), listUsers)

router.route('/:id')
  .delete(validatorHandler(idRequiredSchema), deleteUser)
  .put(validatorHandler(updatedUserSchema), updateUser)

module.exports = router
