const router = require('express').Router()
const search = require('../controllers/search.controller')

router.get('/:collection/:term', search)

module.exports = router