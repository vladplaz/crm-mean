const express = require('express')
const router = express.Router()
const controller=require('../controllers/position')
const passport = require('passport')

router.delete('/:id', passport.authenticate('jwt',{session:false}), controller.remove)

router.post('/', passport.authenticate('jwt',{session:false}), controller.create)

router.get('/:categoryId', passport.authenticate('jwt',{session:false}), controller.getByCategoryId)

router.patch('/:id', passport.authenticate('jwt',{session:false}), controller.update)

module.exports=router
