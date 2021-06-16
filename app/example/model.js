const mongoose = require('mongoose')
const config = require('../config')

const Schema = mongoose.Schema
const schema = new Schema({
  name: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},config.mongoose.options)

const model = mongoose.model('Example', schema)
module.exports = model
