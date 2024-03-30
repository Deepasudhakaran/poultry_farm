const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()


const MedicineSchema = new  Schema({
 
    date: { type: Date, default: Date.now },
    selectedmedicine:{ type: String, required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
 })
 


 const MedicineModel =mongoose.model('medicine',MedicineSchema);
 module.exports = MedicineModel;