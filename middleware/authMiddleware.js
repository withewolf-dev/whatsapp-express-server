const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')

// const protect = expressAsyncHandler(async (req, res, next) => {
//   console.log(req.cookies, 'cokkie')
//   const token = req.cookies[`jwt`]
//   if (!token) {
//     return res.sendStatus(403)
//   }
//   try {
//     const data = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = await User.findById(data._id).select('-password')
//     return next()
//   } catch {
//     return res.sendStatus(403)
//   }
// })

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
