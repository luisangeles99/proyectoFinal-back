const Club = require('../models/club')

const getClub = function(req,res){
    const _id = req.params.id
    Club.findById(_id).then(function(reserva) {
        if(!reserva){
        return res.status(404).send({ error: `Reserve with id ${_id} not found.`})
        }
        return res.send(reserva)
    }).catch(function(error) {
        return res.status(500).send({ error: error })
    })
}

module.exports = {
    getClub: getClub
}