import MenuCategoryModel, { MenuCategory } from '../mongoose/menuCategory';
import MenuItemModel, { MenuItem } from '../mongoose/menuItem';
import connect from '../mongoose/connect';
import { ItemNotFoundError, CategoryNotFoundError, CategoryNotEmptyError } from '../consts/errors';
import { modelToPlainObject } from './util';
import { validateArgs } from './validator';

export const getMenu = async function () {
  await connect();

  const categories = await MenuCategoryModel.find({}).populate('items');
  return categories.map(modelToPlainObject);
};

export const createMenuCategory = async function (title: string) {
  validateArgs({ title });

  const category = new MenuCategoryModel({
    title,
    items: [],
  });
  await category.save();

  return modelToPlainObject(category);
};

export const editMenuCategory = async function (id: string, title: string) {
  validateArgs({ id, title });

  const category = await MenuCategoryModel.findById(id).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }
  category.title = title;
  await category.save();

  return modelToPlainObject(category);
};

export const deleteMenuCategory = async function (id: string) {
  validateArgs({ id });

  const category = await MenuCategoryModel.findById(id).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }
  if (category.items.length > 0) {
    throw new CategoryNotEmptyError();
  }
  await MenuCategoryModel.deleteOne({ _id: category._id }).exec();
};

export const createMenuItem = async function (title: string, price: number, categoryId: string) {
  validateArgs({ title, price, categoryId });

  await connect();

  const category = await MenuCategoryModel.findById(categoryId).exec();
  if (!category) {
    throw new CategoryNotFoundError();
  }

  const item = new MenuItemModel({
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

  const item = await MenuItemModel.findById(id);
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
    const newCategory = await MenuCategoryModel.findById(categoryId).exec();
    if (!newCategory) {
      throw new CategoryNotFoundError();
    }
    newCategory.items.push(item._id);
    await newCategory.save();

    const oldCategory = await MenuCategoryModel.findById(item.category).exec();
    if (oldCategory) {
      oldCategory.items = oldCategory.items.filter((i: MenuItem) => !i._id.equals(item._id));
      await oldCategory.save();
    }
  }

  await item.save();
  return modelToPlainObject(item);
};

export const deleteMenuItem = async function (id: string) {
  validateArgs({ id });

  await connect();

  const item = await MenuItemModel.findByIdAndRemove(id).exec();
  if (!item) {
    throw new ItemNotFoundError();
  }

  const category = await MenuCategoryModel.findById(item.category).exec();
  if (category) {
    //TODO: any
    category.items = category.items.filter((i: MenuCategory) => !i._id.equals(item._id));
    await category.save();
  }

  return true;
};
