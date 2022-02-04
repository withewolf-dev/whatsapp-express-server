const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const expressAsyncHandler = require('express-async-handler')

// const protect = asyncHandler(async (req, res, next) => {
//   if (req.cookies && req.cookies[`jwt`]) {
//     try {
//       console.log(req.cookies[`jwt`])
//       const cookie = req.cookies['jwt']

//       const claims = jwt.verify(cookie, process.env.JWT_SECRET)

//       if (!claims) {
//         return res.status(401).send({
//           message: 'unauthenticated'
//         })
//       }

//       req.user = await User.findById(claims._id).select('-password')
//       // const user = await User.findOne({ _id: claims._id })

//       // const { password, ...data } = await user.toJSON()

//       // res.json(data)
//       next()
//     } catch (e) {
//       return res.status(401).send({
//         message: 'unauthenticated'
//       })
//     }
//   }

//   if (!claims) {
//     res.status(401)
//     throw new Error('Not authorized, no token')
//   }

//   // if (
//   //   req.headers.authorization &&
//   //   req.headers.authorization.startsWith('Bearer')
//   // ) {
//   //   try {
//   //     token = req.headers.authorization.split(' ')[1]

//   //     //decodes token id
//   //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//   //     req.user = await User.findById(decoded.id).select('-password')

//   //     next()
//   //   } catch (error) {
//   //     res.status(401)
//   //     throw new Error('Not authorized, token failed')
//   //   }
//   // }

//   // if (!token) {
//   //   res.status(401)
//   //   throw new Error('Not authorized, no token')
//   // }
// })

const protect = expressAsyncHandler(async (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies[`jwt`]
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
