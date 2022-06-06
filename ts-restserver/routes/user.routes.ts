import { Router } from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users'

import { validateGetUser, validateCreateUser, validateUpdateUser } from "../validators/users"

const router = Router()

router.route('/')
  .get( validateGetUser, getUsers )
  .post( validateCreateUser, createUser)

router.route('/:id')
  .get( getUser )
  .put( validateUpdateUser, updateUser )
  .delete( deleteUser )


export default router
