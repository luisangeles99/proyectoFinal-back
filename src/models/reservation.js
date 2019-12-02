const mongoose = require('mongoose')
const validator = require('validator')

const reservaSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  numberPeople:{
    type: Number,
    required: true
  },
  date:{
      type: Date,
      required: true,
  },
  paid: {
    type: Boolean,
    default: true
  },
  amount: {
      type: Number,
      required: true
  },
  reservationUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Reserva = mongoose.model('Reserva', reservaSchema)

module.exports = Reserva