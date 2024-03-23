const mongoose = require('mongoose');


const FeedSchema = new mongoose.Schema({
    selectedvalue: { type: String, required: true }, 
    consume: { type: String, required: true },
    receive: { type: String, required: true }, 
    fdate: { type: Date, default: Date.now },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'FarmModel', required: true }, 
  });
  
  const FeedModel = mongoose.model('feeds',FeedSchema);
  module.exports = FeedModel;




