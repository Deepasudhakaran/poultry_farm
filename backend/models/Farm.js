const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const FarmSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tokens: [{ type: String }],
  post: [{ type: Schema.Types.ObjectId, ref: 'feeds' }],
  fegg: [{ type: Schema.Types.ObjectId, ref: 'eggs' }],
  fmedicine: [{ type: Schema.Types.ObjectId, ref: 'medicine' }],
  // fmortality: [{ type: Schema.Types.ObjectId, ref: 'mortality' }],
  profi: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

FarmSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
})

const FarmModel = mongoose.model('users', FarmSchema);
module.exports = FarmModel;



