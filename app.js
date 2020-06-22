const express = require('express')
const app=express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')

mongoose.connect(keys.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
  .then(()=>console.log('Mongo connected'))
  .catch((err)=>console.log(err))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth',require('./routes/auth'))
app.use('/api/analytics',require('./routes/analytics'))
app.use('/api/category',require('./routes/category'))
app.use('/api/order',require('./routes/order'))
app.use('/api/position',require('./routes/position'))

module.exports=app
