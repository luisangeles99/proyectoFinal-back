const Reserva = require('../models/reservation')

const getReservas = function(req, res) {
  Reserva.find({ reservationUser: req.user._id}).then(function(reservas) {
    res.send(reservas)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getReserva = function(req, res) {
  const _id = req.params.id
  Reserva.findOne({ _id, reservationUser: req.user._id }).then(function(reserva) {
    if(!reserva){
      return res.status(404).send({ error: `Reserve with id ${_id} not found.`})
    }
    return res.send(reserva)
  }).catch(function(error) {
    return res.status(500).send({ error: error })
  })
}

const createReserva = function(req, res){
  const reserva = new Reserva({
    clubName: req.body.clubName,
    location: req.body.location,
    numberPeople: req.body.numberPeople,
    date: req.body.date,
    paid: true,
    amount: req.body.amount,
    reservationUser: req.user._id
  })
  reserva.save().then(function() {
    return res.send(reserva)
  }).catch(function(error) {
    return res.status(400).send({ error: error })
  })
}

const updateReserva = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['numberPeople', 'date', 'amount']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  
  Reserva.findOneAndUpdate({ _id, reservationUser: req.user._id }, req.body ).then(function(reserva) {
    if (!reserva) {
      return res.status(404).send({ error: `Reserva with id ${_id} not found.`})
    }
    return res.send(reserva)
  }).catch(function(error) {
    res.status(500).send({ error: error })
  })
}

const deleteReserva = function(req, res) { 
  const _id = req.params.id
  Reserva.findOneAndDelete({ _id, reservationUser: req.user._id }).then(function(reserva){
    if(!reserva) {
      return res.status(404).send({ error: `Reserva with id ${_id} not found.`})
    }
    return res.send(reserva)
  }).catch(function(error) {
    res.status(505).send({ error: error })
  })
}

module.exports = {
  getReservas : getReservas,
  getReserva : getReserva,
  createReserva : createReserva,
  updateReserva : updateReserva,
  deleteReserva : deleteReserva
}