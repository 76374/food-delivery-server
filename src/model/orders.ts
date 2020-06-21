import Order from '../mongoose/order';
import MenuItem from '../mongoose/menuItem';
import User from '../mongoose/user';
import connect from '../mongoose/connect';
import { ItemNotFoundError, WrongItemsCountError, UserNotFoundError } from '../consts/errors';
import { modelToPlainObject } from './util';

//TODO: any
export const createOrder = async function (items: any[], userId: string[]) {
  await connect();
  const user = await User.findById(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  if (!items || !items.length) {
    throw new ItemNotFoundError();
  }
  //TODO: any
  items.forEach((item: any) => {
    item.itemsCount = Math.trunc(item.itemsCount);
    if (item.itemsCount <= 0) {
      throw new WrongItemsCountError();
    }
  });
  //TODO: any
  const ids = items.map((i: any) => i.itemId);
  const menuItems = await MenuItem.find({ _id: { $in: ids } }).exec();
  if (menuItems.length !== items.length) {
    throw new ItemNotFoundError();
  }

  let orderPrice = 0;
  const order = new Order({
    //TODO: make forEach as it has side effects
    items: menuItems.map((menuItem) => {
      const menuItemId = menuItem._id.toString();
      //TODO: any
      const item = items.find((i: any) => i.itemId === menuItemId);
      if (item === undefined) {
        //TODO: different error
        throw new ItemNotFoundError();
      }
      const itemsCount = item.itemsCount;
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

export const getOrders = async function () {
  await connect();

  const orders = await Order.find({}).populate('items.menuItem');
  return orders.map((o) => modelToPlainObject(o));
};
