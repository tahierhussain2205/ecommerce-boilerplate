const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const auth = require("../middleware/auth")

router.post('/login', adminController.login)

router.get('/user', auth, adminController.user)

module.exports = router