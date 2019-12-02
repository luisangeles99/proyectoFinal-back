const mongoose = require('mongoose')
if(process.env.NODE_ENV === 'production'){
  var connectionURL = process.env.connectionURL
}
else{
  var connectionURL = require('../config').connectionURL
}

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})