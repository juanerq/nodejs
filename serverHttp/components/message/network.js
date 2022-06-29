const router = require('express').Router()
const response = require('../../network/response')

const { addMessage, getMessages, updateMessage, deleteMessage } = require('./controller')

router.route('/')
  .get((req, res, next) => {
    const user = req.query.user ?? null

    getMessages(user)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })
  
  .post((req, res, next) => {
    addMessage(req.body)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })

router.route('/:id')
  .patch((req, res, next) => {
    const { id } = req.params
    const { message } = req.body

    updateMessage(id, message)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)
  })

  .delete((req, res, next) => {
    const { id } = req.params

    deleteMessage(id)
      .then(result => {
        response.success(req, res, result)
      })
      .catch(next)

  })

module.exports = router