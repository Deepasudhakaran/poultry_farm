const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()


const mortalitySchema = new Schema({
   date: { type: Date, default: Date.now },
   selectedvalue: { type : String, required: true },
    mortality: { type : String, required: true },
    
  });
  

  const MortalityModel = mongoose.model('mortality', mortalitySchema);
  module.exports = MortalityModel ;