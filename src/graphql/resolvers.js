const menuModel = require('../model/menu');
const ordersModel = require('../model/orders');
const usersModel = require('../model/users');
const menuSchedule = require('../model/menuSchedule');
const { getToken } = require('../utils/requestUtil');

module.exports = {
  menu: async function (args, request) {
    return await menuModel.getMenu();
  },
  createMenuCategory: async function (args, request) {
    return await menuModel.createMenuCategory(args.title);
  },
  editMenuCategory: async function (args, request) {
    return await menuModel.editMenuCategory(args.id, args.title);
  },
  deleteMenuCategory: async function (args, request) {
    return await menuModel.deleteMenuCategory(args.id);
  },
  createMenuItem: async function (args, request) {
    const { title, price, menuCategory } = args.menuItem;
    return await menuModel.createMenuItem(title, price, menuCategory);
  },
  editMenuItem: async function (args, request) {
    const { title, price, menuCategory } = args.menuItem;
    return await menuModel.editMenuItem(args.id, title, price, menuCategory);
  },
  deleteMenuItem: async function (args, request) {
    await menuModel.deleteMenuItem(args.id);
    return null;
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
  },
  menuSchedule: async function (args, requst) {
    const { date } = args;
    return await menuSchedule.getSchedule(date);
  },
  setSchedule: async function (args, request) {
    const { items, date } = args;
    return await menuSchedule.setSchedule(items, date);
  },
};
