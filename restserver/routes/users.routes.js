const router = require('express').Router()
const { validateCreateUser, 
        validateUpdateUser, 
        validateDeleteUser, 
        validateReqGet } = require('../validators/user')

const { userGet, userPost, userPut, userDelete } = require('../controllers/users.controller')

router.route('/')
  .get( validateReqGet, userGet )
  .post( validateCreateUser, userPost )

router.route('/:id')
  .put( validateUpdateUser, userPut )
  .delete( validateDeleteUser, userDelete )


module.exports = router