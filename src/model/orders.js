const mongoose = require('mongoose');

const Order = require('../mongoose/order');
const MenuItem = require('../mongoose/menuItem');
const connect = require('../mongoose/connect');
const errors = require('../utils/errors');

const ObjectId = mongoose.Types.ObjectId;

const createOrder = async function (items) {
  await connect();

  if (!items || !items.length) {
    throw errors.getUnexpectedArgs('no items');
  }
  items.forEach((i) => {
    i.count = Math.trunc(i.count);
    if (i.count <= 0) {
      throw errors.getUnexpectedArgs('wrong items count');
    }
  });

  const ids = items.map((i) => i.itemId);
  const menuItems = await MenuItem.find({ _id: { $in: ids } }).exec();
  if (menuItems.length !== items.length) {
    throw errors.getUnexpectedArgs('wrong id(s)');
  }

  const order = new Order({
    items: items.map((i) => ({ id: ObjectId(i.itemId), count: i.itemsCount })),
    date: new Date(),
  });
  await order.save();

  return { ...order.doc, id: order._id };
};

module.exports = {
  createOrder,
};
