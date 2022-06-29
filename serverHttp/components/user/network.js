const router = require('express').Router()
const response = require('../../network/response')

const { addUser, getUsers } = require('./controller')

router.route('/')
  .get((req, res, next) => {
    const user = req.query.user ?? null

    getUsers(user)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })
  .post((req, res, next) => {
    const name = req.body.name

    addUser(name)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })

module.exports = router