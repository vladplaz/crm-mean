const Category = require('../models/Category')
const Position = require('../models/Position')

module.exports.getAll = async function(req,res) {
  try {
    const categories = await Category.find({user: req.user.userId})
    res.status(200).json(categories)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async function(req,res) {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async function(req,res) {
  try {
    await Category.remove({_id: req.params.id})
    await Position.remove({category:req.params.id})
    res.status(200).json({message:'Категория удалена'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.create = async function(req,res) {
  try {
    const category = new Category({
      name: req.body.name,
      user: req.user.userId,
      imageSrc: req.file ? req.file.path : ''
    })
    await category.save()
    res.status(201).json(category)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.update = async function(req,res) {
  try {
    const updated = {
      name: req.body.name
    }
    if(req.file)
      updated.imageSrc = req.file.path
    const category = await Category.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(category)
  } catch(e) {
    res.status(500).json(e)
  }
}
