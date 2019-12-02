const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

if(process.env.NODE_ENV === 'production'){
  var secret = process.env.SECRET 
}
else{
  var secret = require('../config').secret
}

const userSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: true
  },
  Apellido:{
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if ( value < 18 ) {
        throw new Error('Debes ser mayor de 18 años')
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email invalido')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
})

userSchema.virtual('reservas', { 
  ref: 'Reserva',
  localField: '_id',
  foreignField: 'reservationUser'
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}


userSchema.statics.findByCredentials = function(email, password) {
  return new Promise( function(resolve, reject) {
    User.findOne({ email }).then(function(user) {
      if( !user ) {
        return reject('User does not exist')
      }
      bcrypt.compare(password, user.password).then(function(match) {
        if(match) {
          return resolve(user)
        } else {
          return reject('Wrong password!')
        }
      }).catch( function(error) {
        return reject('Wrong password!')
      })
    })
  })
}

userSchema.methods.generateToken = function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: '3 days'})
  user.tokens = user.tokens.concat({ token })
  return new Promise(function( resolve, reject) {
    user.save().then(function(user){
      return resolve(token)
    }).catch(function(error) {
      return reject(error)
    })
  })
}

userSchema.pre('save', function(next) {
  const user = this
  if( user.isModified('password') ) {
    bcrypt.hash(user.password, 8).then(function(hash){
      user.password = hash
      next()
    }).catch(function(error){
      return next(error)
    })
  } else {
    next()  
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User