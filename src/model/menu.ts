import MenuCategory from '../mongoose/menuCategory';
import MenuItem from '../mongoose/menuItem';
import connect from '../mongoose/connect';
import { ItemNotFoundError, CategoryNotFoundError, CategoryNotEmptyError } from '../consts/errors';
import { modelToPlainObject } from './util';
import { validateArgs } from './validator';

export const getMenu = async function () {
  await connect();

  const categories = await MenuCategory.find({}).populate('items');
  return categories.map((cat) => modelToPlainObject(cat, 'items'));
};

export const createMenuCategory = async function (title: string) {
  validateArgs({ title });

  const category = new MenuCategory({
    title,
    items: [],
  });
  await category.save();

  return modelToPlainObject(category);
};

export const editMenuCategory = async function (id: string, title: string) {
  validateArgs({ id, title });

  const category = await MenuCategory.findById(id).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }
  category.title = title;
  await category.save();

  return modelToPlainObject(category);
};

export const deleteMenuCategory = async function (id: string) {
  validateArgs({ id });

  const category = await MenuCategory.findById(id).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }
  if (category.items.length > 0) {
    throw new CategoryNotEmptyError();
  }
  await MenuCategory.deleteOne({ _id: category._id }).exec();
};

export const createMenuItem = async function (title: string, price: number, categoryId: string) {
  validateArgs({ title, price, categoryId });

  await connect();

  const category = await MenuCategory.findById(categoryId).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }

  const item = new MenuItem({
    title,
    price,
    category: category._id,
  });

  category.items.push(item._id);

  await item.save();
  await category.save();

  return modelToPlainObject(item);
};

export const editMenuItem = async function (
  id: string,
  title: string,
  price: number,
  categoryId: string
) {
  validateArgs({ id, title, price, categoryId });

  await connect();

  const item = await MenuItem.findById(id);
  if (!item) {
    throw new ItemNotFoundError();
  }

  if (title) {
    item.title = title;
  }
  if (price || price === 0) {
    item.price = price;
  }
  if (categoryId && item.category.toString() !== categoryId) {
    const newCategory = await MenuCategory.findById(categoryId).exec();
    if (!newCategory) {
      throw new CategoryNotFoundError();
    }
    newCategory.items.push(item._id);
    await newCategory.save();

    const oldCategory = await MenuCategory.findById(item.category).exec();
    if (oldCategory) {
      //TODO: any
      oldCategory.items = oldCategory.items.filter((i: any) => !i._id.equals(item._id));
      await oldCategory.save();
    }
  }

  await item.save();
  return { ...item._doc, id: item._id.toString() };
};

export const deleteMenuItem = async function (id: string) {
  validateArgs({ id });

  await connect();

  const item = await MenuItem.findByIdAndRemove(id).exec();
  if (!item) {
    throw new ItemNotFoundError();
  }

  const category = await MenuCategory.findById(item.category).exec();
  if (category) {
    //TODO: any
    category.items = category.items.filter((i: any) => !i._id.equals(item._id));
    await category.save();
  }
};
