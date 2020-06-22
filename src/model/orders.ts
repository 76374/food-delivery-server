import OrderModel, { OrderItem } from '../mongoose/OrderModel';
import MenuItemModel from '../mongoose/MenuItemModel';
import UserModel from '../mongoose/UserModel';
import connect from '../mongoose/connect';
import { ItemNotFoundError, WrongItemsCountError, UserNotFoundError } from '../consts/errors';
import { modelToPlainObject } from './util';


interface OrderInput {
  itemId: string;
  itemsCount: number;
}

export const createOrder = async function (items: OrderInput[], userId: string) {
  await connect();
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new UserNotFoundError();
  }

  if (!items || !items.length) {
    throw new ItemNotFoundError();
  }

  let orderPrice = 0;
  const orderItems: OrderItem[] = [];

  for (const item of items) {
    item.itemsCount = Math.trunc(item.itemsCount);
    if (item.itemsCount <= 0) {
      throw new WrongItemsCountError();
    }
    const menuItem = await MenuItemModel.findById(item.itemId);
    if (!menuItem) {
      throw new ItemNotFoundError();
    }
    orderItems.push({
      menuItem: menuItem._id,
      count: item.itemsCount
    });
    orderPrice += menuItem.price;
  }

  console.log(orderItems);

  const order = new OrderModel({
    items: orderItems,
    date: new Date(),
    price: orderPrice,
    owner: user._id,
  });
  await order.save();

  return modelToPlainObject(order);
};

export const getOrders = async function () {
  await connect();

  const orders = await OrderModel.find({}).populate('items.menuItem');
  return orders.map((o) => modelToPlainObject(o));
};
