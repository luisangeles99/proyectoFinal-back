const express = require('express')
const router = express.Router()

const users = require('./controllers/users.js')
const reservas = require('./controllers/reservations.js')
const clubs = require('./controllers/clubs.js')
const auth = require('./middleware/auth')

//users
router.get('/users', auth, users.getUser)
router.post('/login', users.login)
router.post('/logout', auth, users.logout)
router.post('/users', users.createUser)  // signup
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

//reservations
router.get('/reservations/:id', auth, reservas.getReserva)
router.get('/reservations', auth, reservas.getReservas)
router.post('/reservations', auth, reservas.createReserva)
router.patch('/reservations/:id', auth, reservas.updateReserva)
router.delete('/reservations/:id', auth, reservas.deleteReserva)

// get clubs
router.get('/clubs/:id', clubs.getClub) 


router.get('*', function(req, res) {
    res.send({
      error: 'Working currently in the development of Nights; sorry for the trouble'
    })
})
  
module.exports = router