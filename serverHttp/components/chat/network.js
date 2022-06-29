const router = require('express').Router()
const response = require('../../network/response')

const { addChat, listChats } = require('./controller')

router.route('/')
  .post((req, res, next) => {
    addChat(req.body)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })

router.route('/:userId?')
  .get((req, res, next) => {
    const { userId } = req.params ?? null

    listChats(userId)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })

module.exports = router