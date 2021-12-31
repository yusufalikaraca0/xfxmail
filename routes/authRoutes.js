const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login',authController.login_get)
router.post('/finduser',authController.finduser_post)
router.get('/register',authController.register_get)
router.post('/register',authController.register_post)
router.post('/finduser',authController.finduser_post)

module.exports = router;