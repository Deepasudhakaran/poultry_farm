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
tokens: [{ type: String }],

});

const AdminModel = mongoose.model('Admin', adminSchema);
module.exports = AdminModel;
