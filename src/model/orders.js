const Order = require('../mongoose/order');
const MenuItem = require('../mongoose/menuItem');
const User = require('../mongoose/user');
const connect = require('../mongoose/connect');
const { itemNotFound, wrongItemsCount, userNotFound } = require('../consts/errors');
const getError = require('../utils/getError');
const { modelToPlainObject } = require('./util');

const createOrder = async function (items, userId) {
  await connect();
  const user = await User.findById(userId);
  if (!user) {
    throw getError(userNotFound);
  }

  if (!items || !items.length) {
    throw getError(itemNotFound);
  }
  items.forEach((i) => {
    i.count = Math.trunc(i.count);
    if (i.count <= 0) {
      throw getError(wrongItemsCount);
    }
  });
  const ids = items.map((i) => i.itemId);
  const menuItems = await MenuItem.find({ _id: { $in: ids } }).exec();
  if (menuItems.length !== items.length) {
    throw getError(itemNotFound);
  }

  let orderPrice = 0;
  const order = new Order({
    //TODO: make forEach as it has side effects
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
    price: orderPrice,
    owner: user._id,
  });
  await order.save();

  return { ...order.doc, id: order._id };
};

const getOrders = async function () {
  await connect();

  const orders = await Order.find({}).populate('items.menuItem');
  return orders.map((o) => modelToPlainObject(o));
};

module.exports = {
  createOrder,
  getOrders,
};
