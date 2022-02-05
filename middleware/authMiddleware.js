const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const expressAsyncHandler = require('express-async-handler')

const protect = expressAsyncHandler(async (req, res, next) => {
  console.log(req.cookies, 'cokkie')
  const token = req.cookies[`next-auth.session-token`]
  if (!token) {
    return res.sendStatus(403)
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(data._id).select('-password')
    return next()
  } catch {
    return res.sendStatus(403)
  }
})

module.exports = { protect }
