const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const generateToken = require('../config/generateToken')

// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: 'i' } },
//           { email: { $regex: req.query.search, $options: 'i' } }
//         ]
//       }
//     : {}

//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
//   res.send(users)
// })

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, pic } = req.body

//   if (!name || !email || !password) {
//     res.status(400)
//     throw new Error('Please Enter all the Feilds')
//   }

//   const userExists = await User.findOne({ email })

//   if (userExists) {
//     res.status(400)
//     throw new Error('User already exists')
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     pic
//   })

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       pic: user.pic
//     })
//   } else {
//     res.status(400)
//     throw new Error('User not found')
//   }
// })

// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   const user = await User.findOne({ email })

//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

//   res.cookie('jwt', token, {
//     httpOnly: false,
//     maxAge: 24 * 60 * 60 * 1000,
//     path: '/',
//     domain: '.https://client-test-coral.vercel.app'
//   })

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       pic: user.pic,
//       token: token
//     })
//   } else {
//     res.status(401)
//     throw new Error('Invalid Email or Password')
//   }
// })

// const me = asyncHandler(async (req, res) => {
//   try {
//     const cookie = req.cookies['jwt']

//     const claims = jwt.verify(cookie, process.env.JWT_SECRET)

//     if (!claims) {
//       return res.status(401).send({
//         message: 'unauthenticated claim'
//       })
//     }

//     const user = await User.findOne({ _id: claims._id })

//     const { password, ...data } = await user.toJSON()

//     res.send(data)
//   } catch (e) {
//     return res.status(401).send({
//       user: null
//     })
//   }
// })

// const logout = asyncHandler((req, res) => {
//   res.clearCookie('jwt', { path: '/' })

//   res.send({
//     message: 'logout successful'
//   })
// })

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {}

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.send(users)
})

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please Enter all the Feilds')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})
module.exports = { registerUser, authUser, allUsers }
