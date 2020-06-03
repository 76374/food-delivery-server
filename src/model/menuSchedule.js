const { invalidDateFormat, itemNotFound } = require('../consts/errors');
const getError = require('../utils/getError');
const connect = require('../mongoose/connect');
const MenuSchedule = require('../mongoose/menuSchedule');
const MenuItem = require('../mongoose/menuItem');
const { modelToPlainObject } = require('./util');

const parseDate = (date) => {
  let parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    throw getError(invalidDateFormat);
  }
  return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
}

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
  const ids = menuItems.map((i) => i._id);

  let menuSchedule = await MenuSchedule.findOne({ date }).exec();
  if (menuSchedule) {
    menuSchedule.items = ids;
  } else {
    menuSchedule = new MenuSchedule({
      items: ids,
      date,
    });
  }
  await menuSchedule.save();

  return menuSchedule._id.toString();
};

const getSchedule = async function (date) {
  date = parseDate(date);

  await connect();

  const menuSchedule = await MenuSchedule.findOne({ date }).populate('items');

  return menuSchedule ? modelToPlainObject(menuSchedule, 'items') : null;
}

module.exports = {
  setSchedule,
  getSchedule
};
