const Position = require('../models/Position')

module.exports.getByCategoryId = async function(req,res) {
  try {
    const positions = await Position.find({
      category:req.params.categoryId,
      user:req.user.userId
    })
    res.status(200).json(positions)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async function(req,res) {
  try {
    await Position.remove({_id:req.params.id})
    res.status(200).json({message:'Позиция была удалена'})
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.update = async function(req,res) {
  try {
    const position = await Position.findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true}
    )
    res.status(200).json(position)
  } catch(e) {
    res.status(500).json(e)
  }
}

module.exports.create = async function(req,res) {
  try {
    const position = new Position({
      name:req.body.name,
      cost:req.body.cost,
      category:req.body.category,
      user:req.user.userId
    })
    await position.save()
    res.status(201).json(position)
  } catch(e) {
    res.status(500).json(e)
  }
}
