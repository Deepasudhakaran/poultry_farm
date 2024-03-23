const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()

const notificationSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
});

const Message = mongoose.model('Message', notificationSchema);
module.exports = Message;

