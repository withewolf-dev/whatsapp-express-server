const express = require('express')
const {
  registerUser,
  authUser,
  allUsers,
  me,
  logout
} = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.get('/logout', logout)
router.get('/', protect, allUsers)
router.get('/me', me)

module.exports = router
