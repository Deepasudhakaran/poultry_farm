const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  afeed:{ type: mongoose.Schema.Types.ObjectId, ref: 'feeds', required: true }, 
 amedicine:{ type: mongoose.Schema.Types.ObjectId, ref: 'medicine', required: true }, 
 amortality:{ type: mongoose.Schema.Types.ObjectId, ref: 'mortality', required: true }, 
 aegg:{ type: mongoose.Schema.Types.ObjectId, ref: 'eggs', required: true }, 
aprofile:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }, 

tokens: [{ type: String }],


});

const AdminModel = mongoose.model('Admin', adminSchema);
module.exports = AdminModel;



