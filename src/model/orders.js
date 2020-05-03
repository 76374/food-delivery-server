const mongoose = require('mongoose');

const Order = require('../mongoose/order');
const MenuItem = require('../mongoose/menuItem');
const errors = require('../utils/errors');

const ObjectId = mongoose.Types.ObjectId;

const createOrder = async function (items) {
  if (!items || !items.length) {
    throw errors.getUnexpectedArgs('no items');
  }

  const menuItems = await MenuItem.find({ _id: { $in: items } }).exec();
  if (menuItems.length !== items.length) {
    throw errors.getUnexpectedArgs('wrong id(s)');
  }

  const order = new Order({
    items: items.map((i) => ObjectId(i)),
    date: new Date(),
  });
  await order.save();
  return order._id.toString();
};

module.exports = {
  createOrder,
};
