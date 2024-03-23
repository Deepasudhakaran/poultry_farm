const mongoose = require('mongoose');
const { Schema } = mongoose;

const EggSchema = new Schema({
    date:{ type: Date, default: Date.now },
     total: { type: String, required: true },
     broken: { type: String, required: true },
     selectedName: { type: String, required: true },
     createdBy: { type: Schema.Types.ObjectId, ref: 'users' }
  });

  const EggModel = mongoose.model('eggs', EggSchema);
  module.exports ={EggModel };

