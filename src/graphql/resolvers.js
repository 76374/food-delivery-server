const menuModel = require('../model/menu');
const ordersModel = require('../model/orders');
const usersModel = require('../model/users');
const { getToken } = require('../utils/requestUtil');

module.exports = {
  menu: async function (args, request) {
    return await menuModel.getMenu();
  },
  createMenuItem: async function (args, request) {
    const { title, price, menuCategory } = args.input;
    return await menuModel.createMenuItem(title, price, menuCategory);
  },
  editMenuItem: async function (args, request) {
    const { id, title, price, menuCategory } = args.input;
    return await menuModel.editMenuItem(id, title, price, menuCategory);
  },
  deleteMenuItem: async function (args, request) {
    const { id } = args.input;
    return await menuModel.deleteMenuItem(id);
  },
  createOrder: async function (args, request) {
    const userId = await usersModel.checkAutorization(getToken(request));
    const { items } = args.input;
    return await ordersModel.createOrder(items, userId);
  },
  orders: async function (args, request) {
    return await ordersModel.getOrders();
  },
  signIn: async function (args, request) {
    const { email, pwd } = args.input;
    return await usersModel.signIn(email, pwd);
  },
  signUp: async function (args, request) {
    const { firstName, lastName, email, pwd } = args.input;
    return await usersModel.signUp(firstName, lastName, email, pwd);
  }
};
