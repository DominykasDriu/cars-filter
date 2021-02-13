const mongoose = require('mongoose');

let newCar = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required!']
  },
  model: {
    type: String,
    required: [true, 'Model is required!']
  },
  year: {
    type: Number,
    required: [true, 'Year is required!']
  },
  rida: {
    type: Number,
    required: [true, 'Rida is required!']
  },
  shift: {
    type: String,
    required: [true, 'Shift type is required!'],
    enum: ['Manual', 'Automatic']
  }
})

const Car = mongoose.model('Cars', newCar)

module.exports = Car;