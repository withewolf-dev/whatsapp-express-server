const express = require('express')
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup
} = require('../controller/chatController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/removeUser').put(protect, removeFromGroup)
router.route('/addUser').put(protect, addToGroup)

module.exports = router
