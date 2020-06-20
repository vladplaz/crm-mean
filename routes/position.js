const express = require('express')
const router = express.Router()
const controller=require('../controllers/position')

router.delete('/:id',controller.remove)

router.post('/',controller.create)

router.get('/:categoryId',controller.getByCategoryId)

router.patch('/:id',controller.update)

module.exports=router
