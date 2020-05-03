const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  date: String
});

module.exports = mongoose.model('Order', schema);