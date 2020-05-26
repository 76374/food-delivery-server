const menuModel = require('../model/menu');
const ordersModel = require('../model/orders');
const usersModel = require('../model/users');

module.exports = {
  menu: async function (args, context, request) {
    return await menuModel.getMenu();
  },
  createMenuItem: async function (args, context, request) {
    const { title, price, menuCategory } = args.input;
    return await menuModel.createMenuItem(title, price, menuCategory);
  },
  editMenuItem: async function (args, context, request) {
    const { id, title, price, menuCategory } = args.input;
    return await menuModel.editMenuItem(id, title, price, menuCategory);
  },
  deleteMenuItem: async function (args, context, request) {
    const { id } = args.input;
    return await menuModel.deleteMenuItem(id);
  },
  createOrder: async function (args, context, request) {
    const { items } = args.items;
    return await ordersModel.createOrder(items);
  },
  orders: async function (args, context, request) {
    return await ordersModel.getOrders();
  },
  signIn: async function (args, context, request) {
    const { email, pwd } = args.input;
    return await usersModel.signIn(email, pwd);
  },
  signUp: async function (args, context, request) {
    const { firstName, lastName, email, pwd } = args.input;
    return await usersModel.signUp(firstName, lastName, email, pwd);
  }
};
