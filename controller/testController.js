const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send({
      message: 'user not found'
    })
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: 'invalid credentials'
    })
  }

  const token = jwt.sign({ _id: user._id }, 'secret')

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.send({
    message: 'success'
  })
})

const me = expressAsyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies['jwt']

    const claims = jwt.verify(cookie, 'secret')

    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated claim'
      })
    }

    const user = await User.findOne({ _id: claims._id })

    const { password, ...data } = await user.toJSON()

    res.send(data)
  } catch (e) {
    return res.status(401).send({
      message: 'unauthenticated cookie'
    })
  }
})

module.exports = { login, me }
