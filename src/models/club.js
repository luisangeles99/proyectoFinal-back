const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    conMinimo:{
        type: Number,
        required:true
    }
})

const Club = mongoose.model('Club', clubSchema)

module.exports = Club