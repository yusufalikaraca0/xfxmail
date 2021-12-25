const express = require('express')
const router = express.Router()
const controller = require('../controllers/contoller')
//const {index_get} = controller

router.get('/',controller.index_get)

module.exports = router;