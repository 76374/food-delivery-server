const { invalidDateFormat, itemNotFound } = require('../consts/errors');
const getError = require('../utils/getError');
const connect = require('../mongoose/connect');
const MenuSchedule = require('../mongoose/menuSchedule');
const MenuItem = require('../mongoose/menuItem');

const setSchedule = async function (items, date) {
  if (!items || !items.length) {
    throw getError(itemNotFound);
  }

  date = new Date(date);
  if (isNaN(date)) {
    throw getError(invalidDateFormat);
  }
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

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

module.exports = {
  setSchedule,
};
