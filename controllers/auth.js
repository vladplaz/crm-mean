const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports.login= async function(req,res) {
  try {
    const candidate = await User.findOne({email: req.body.email})
    if(candidate) {
      const match = bcrypt.compateSync(req.body.password, candidate.password)
      if(match) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.JWT_SECRET, {expiresIn: '1h'})
        return res.status(200).json({
          token
        })
      }
      return res.status(404).json({message: 'Такого пользователя не существует'})
    }
    res.status(404).json({message: 'Такого пользователя не существует'})
  } catch(err) {
    res.status(400).json(err)
  }
}

module.exports.register=async function(req,res) {
  try {
    const candidate = await User.findOne({email: req.body.email})
    if(candidate)
      return res.status(409).json({
        message: 'Такой email уже занят'
      })

    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    await user.save()
    res.status(201).json(user)
  } catch(err) {
    res.status(400).json(err)
  }
}
