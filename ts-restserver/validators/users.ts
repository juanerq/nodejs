import { check } from 'express-validator'
import validateFiles from '../middlewares/validate-files'

import { userExists } from '../middlewares/db-validators'

export const validateGetUser = [
  check('from', 'Query from is not a number').optional().isNumeric(),
  check('limit', 'Query limit is not a number').optional().isNumeric(),
  validateFiles
]

export const validateCreateUser = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'This email is invalid').isEmail(),
  check('email').custom(userExists),
  validateFiles
]

export const validateUpdateUser = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('email', 'This email is invalid').optional().isEmail(),
  check('email').optional().custom(userExists),
  validateFiles
]