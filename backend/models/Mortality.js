const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()


const mortalitySchema = new Schema({
   date: { type: Date, default: Date.now },
   selectedvalue: { type : String, required: true },
    mortality: { type : String, required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
    // owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, 
  });
  

  const MortalityModel = mongoose.model('mortality', mortalitySchema);
  module.exports = MortalityModel ;