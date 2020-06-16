const { invalidDateFormat, itemNotFound } = require('../consts/errors');
const getError = require('../utils/getError');
const connect = require('../mongoose/connect');
const MenuSchedule = require('../mongoose/menuSchedule');
const MenuItem = require('../mongoose/menuItem');
const ScheduleCategory = require('../mongoose/sheduleCategory');
const { modelToPlainObject } = require('./util');

const parseDate = (date) => {
  let parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    throw getError(invalidDateFormat);
  }
  return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
};

const setSchedule = async function (items, date) {
  if (!items || !items.length) {
    throw getError(itemNotFound);
  }
  date = parseDate(date);

  await connect();

  const menuItems = await MenuItem.find({ _id: { $in: items } }).exec();
  if (menuItems.length !== items.length) {
    throw getError(itemNotFound);
  }

  let menuSchedule = await MenuSchedule.findOne({ date }).exec();
  if (!menuSchedule) {
    menuSchedule = new MenuSchedule({
      categories: [],
      date,
    });
  }

  const containsId = (arr, id) => arr.find((el) => el.equals(id));
  const categories = [];
  menuItems.forEach((menuItem) => {
    if (!containsId(categories, menuItem.category)) {
      categories.push(menuItem.category);
    }
  });
  const sheduleCategories = categories.map(
    (category) =>
      new ScheduleCategory({
        schedule: menuSchedule,
        category: category,
        items: menuItems.filter((i) => i.category.equals(category)).map((i) => i._id),
      })
  );
  for (let sc of sheduleCategories) {
    await sc.save();
  }

  menuSchedule.categories = sheduleCategories.map(i => i._id);

  await menuSchedule.save();

  return menuSchedule._id.toString();
};

const getSchedule = async function (date) {
  date = parseDate(date);
  await connect();

  const menuSchedule = await MenuSchedule.findOne({ date })
    .populate('categories')
    .populate({ path: 'categories', populate: { path: 'items' } })
    .populate({ path: 'categories', populate: { path: 'category' } });
  if (!menuSchedule) {
    return null;
  }
  const result = modelToPlainObject(menuSchedule, 'categories');
  result.categories.forEach((c) => {
    c.items.map((i) => modelToPlainObject(i));
    c.category = modelToPlainObject(c.category);
  });
  return result;
};

module.exports = {
  setSchedule,
  getSchedule,
};
