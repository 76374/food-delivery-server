const mongoose = require('mongoose');

const Order = require('../mongoose/order');
const MenuItem = require('../mongoose/menuItem');
const connect = require('../mongoose/connect');
const errors = require('../utils/errors');
const { menuItemToPlainObject } = require('./menu');


const orderItemToPlainObject = (orderItem) => ({
  id: orderItem._id.toString(),
  menuItem: menuItemToPlainObject(orderItem.menuItem),
  count: orderItem.count,
});

const orderToPlainObject = (order) => {
  return {
    id: order._id.toString(),
    items: order.items.map((i) => orderItemToPlainObject(i)),
    date: order.date,
    price: order.price
  };
};

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

  let orderPrice = 0;
  const order = new Order({
    items: menuItems.map((menuItem) => {
      const menuItemId = menuItem._id.toString();
      const itemsCount = items.find((i) => i.itemId === menuItemId).itemsCount;
      orderPrice += menuItem.price * itemsCount;
      return {
        menuItem: menuItem._id,
        count: itemsCount,
      };
    }),
    date: new Date(),
    price: orderPrice
  });
  await order.save();

  return { ...order.doc, id: order._id };
};

const getOrders = async function () {
  await connect();

  const orders = await Order.find({}).populate('items.menuItem');
  return orders.map((o) => orderToPlainObject(o));
};

module.exports = {
  createOrder,
  getOrders,
};
