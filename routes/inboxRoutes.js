const express = require('express')
const router = express.Router()
const inboxController = require('../controllers/inboxController.js')
router.get('/inbox',inboxController.inbox_get)

module.exports = router