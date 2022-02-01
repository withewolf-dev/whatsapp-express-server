const express = require('express')
const { login, me } = require('../controller/testController')

const router = express.Router()

router.post('/login', login)
router.get('/me', me)
module.exports = router
