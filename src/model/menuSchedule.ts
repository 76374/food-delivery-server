import { ObjectId } from 'mongodb';
import { InvalidDateError, ItemNotFoundError } from '../consts/errors';
import connect from '../mongoose/connect';
import MenuSchedule from '../mongoose/MenuScheduleModel';
import MenuItem from '../mongoose/MenuItemModel';
import ScheduleCategory from '../mongoose/SheduleCategoryModel';
import { modelToPlainObject } from './util';

const parseDate = (date: string) => {
  let parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new InvalidDateError();
  }
  return new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
};

const containsId = (arr: ObjectId[], id: ObjectId) => arr.find((el) => el.equals(id));

export const setSchedule = async function (items: string[], date: string) {
  if (!items || !items.length) {
    new ItemNotFoundError();
  }
  const parsedDate = parseDate(date);

  await connect();

  const menuItems = await MenuItem.find({ _id: { $in: items } }).exec();
  if (menuItems.length !== items.length) {
    throw new ItemNotFoundError();
  }

  let menuSchedule = await MenuSchedule.findOne({ date: parsedDate }).exec();
  if (!menuSchedule) {
    menuSchedule = new MenuSchedule({
      categories: [],
      date,
    });
  }
  const categories: ObjectId[] = [];
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

export const getSchedule = async function (date: string) {
  const parsedDate = parseDate(date);
  await connect();

  const menuSchedule = await MenuSchedule.findOne({ date: parsedDate })
    .populate('categories')
    .populate({ path: 'categories', populate: { path: 'items' } })
    .populate({ path: 'categories', populate: { path: 'category' } });
  if (!menuSchedule) {
    return null;
  }
  return modelToPlainObject(menuSchedule);;
};
