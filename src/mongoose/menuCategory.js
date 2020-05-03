const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
});

module.exports = mongoose.model('MenuCategory', schema);
