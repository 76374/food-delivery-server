const menuModel = require('../model/menu');
const ordersModel = require('../model/orders');

module.exports = {
  menu: async function (args, request) {
    return await menuModel.getMenu();
  },
  createMenuItem: async function (args, request) {
    const { title, price, menuCategory } = args.input;
    return await menuModel.createMenuItem(title, price, menuCategory);
  },
  editMenuItem: async function (args, request) {
    const { id, title, price, menuCategory} = args.input;
    return await menuModel.editMenuItem(id, title, price, menuCategory);
  },
  createOrder: async function (args, request) {
    return await ordersModel.createOrder(args.input.items);
  },
};
