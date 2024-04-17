const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({

  farmname: { type: String, required: true, },
  ownername: {type: String,required: true,},
  email: {type: String,required: true,},
  farmid: {type: String,required: true,},
  address: {type: String,required: true,},
  phoneno: {type: String,required: true,},
  houseno: {type: Number,required: true,},
  capacity: {type: Number,required: true,},
  birdno: { type: Number, required: true,},
  broilerno: {type: Number,required: true,},
  breederno: {type: Number, required: true,},
  layerno: {type: Number,required: true,},
  isBroiler: {type: Boolean,default: false,},
  isLayer: {type: Boolean,default: false,},
  isBreeder: {type: Boolean,default: false,},
  user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
//  owner:{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, 
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);
module.exports = ProfileModel;


