import type { Request } from 'express';
import * as menuModel from '../model/menu';
import * as ordersModel from '../model/orders';
import * as usersModel from '../model/users';
import * as menuSchedule from '../model/menuSchedule';
import * as adminUser from '../model/adminUser';
import { getToken } from '../utils/requestUtil';

export default {
  menu: async function () {
    return await menuModel.getMenu();
  },
  createMenuCategory: async function (args: any) {
    return await menuModel.createMenuCategory(args.title);
  },
  editMenuCategory: async function (args: any) {
    return await menuModel.editMenuCategory(args.id, args.title);
  },
  deleteMenuCategory: async function (args: any) {
    return await menuModel.deleteMenuCategory(args.id);
  },
  createMenuItem: async function (args: any) {
    const { title, price, menuCategory } = args.menuItem;
    return await menuModel.createMenuItem(title, price, menuCategory);
  },
  editMenuItem: async function (args: any) {
    const { title, price, menuCategory } = args.menuItem;
    return await menuModel.editMenuItem(args.id, title, price, menuCategory);
  },
  deleteMenuItem: async function (args: any) {
    await menuModel.deleteMenuItem(args.id);
    return null;
  },
  createOrder: async function (args: any, request: Request) {
    const userId = await usersModel.checkAutorization(getToken(request));
    const { items } = args.input;
    return await ordersModel.createOrder(items, userId);
  },
  orders: async function () {
    return await ordersModel.getOrders();
  },
  signIn: async function (args: any) {
    const { email, pwd } = args.input;
    return await usersModel.signIn(email, pwd);
  },
  signUp: async function (args: any) {
    const { firstName, lastName, email, pwd } = args.input;
    return await usersModel.signUp(firstName, lastName, email, pwd);
  },
  menuSchedule: async function (args: any) {
    const { date } = args;
    return await menuSchedule.getSchedule(date);
  },
  setSchedule: async function (args: any) {
    const { items, date } = args;
    return await menuSchedule.setSchedule(items, date);
  },
  signInAdmin: async function (args: any) {
    const { name, pwd } = args;
    return await adminUser.signIn(name, pwd);
  }
};
