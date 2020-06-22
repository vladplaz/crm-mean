const express = require('express')
const router = express.Router()
const controller=require('../controllers/category')
const passport = require('passport')
const upload = require('../middleware/upload')

router.get('/', passport.authenticate('jwt',{session:false}), controller.getAll)

router.get('/:id', passport.authenticate('jwt',{session:false}), controller.getById)

router.delete('/:id', passport.authenticate('jwt',{session:false}), controller.remove)

router.patch('/:id', passport.authenticate('jwt',{session:false}), upload.single('image'), controller.update)

router.post('/', passport.authenticate('jwt',{session:false}), upload.single('image'), controller.create)

module.exports=router
