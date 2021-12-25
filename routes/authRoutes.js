const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login',authController.login_get)

module.exports = router;