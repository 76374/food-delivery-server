const MenuCategory = require('../mongoose/menuCategory');
const MenuItem = require('../mongoose/menuItem');
const connect = require('../mongoose/connect');
const { itemNotFound, categoryNotFound, categoryNotEmpty } = require('../consts/errors');
const getError = require('../utils/getError');
const { modelToPlainObject } = require('./util');
const { validateArgs } = require('./validator');

const getMenu = async function () {
  await connect();

  const categories = await MenuCategory.find({}).populate('items');
  return categories.map((cat) => modelToPlainObject(cat, 'items'));
};

const createMenuCategory = async function (title) {
  validateArgs({ title });

  const category = new MenuCategory({
    title,
    items: []
  });
  await category.save();

  return modelToPlainObject(category);
};

const editMenuCategory = async function (id, title) {
  validateArgs({ id, title });

  const category = await MenuCategory.findById(id).exec(); 
  if (!category) {
    throw getError(categoryNotFound);
  }
  category.title = title;
  await category.save();

  return modelToPlainObject(category);
}

const deleteMenuCategory = async function (id) {
  validateArgs({ id });

  const category = await MenuCategory.findById(id).exec();
  if (!category) {
    throw getError(categoryNotFound);
  }
  if (category.items.length > 0) {
    throw getError(categoryNotEmpty);
  }
  await MenuCategory.deleteOne({_id: category._id}).exec();
}

const createMenuItem = async function (title, price, categoryId) {
  validateArgs({ title, price, categoryId });

  await connect();

  const category = await MenuCategory.findById(categoryId).exec();
  if (!category) {
    throw getError(categoryNotFound);
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

const editMenuItem = async function (id, title, price, categoryId) {
  validateArgs({ id, title, price, categoryId });

  await connect();

  const item = await MenuItem.findById(id);
  if (!item) {
    throw getError(itemNotFound);
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
      throw getError(categoryNotFound);
    }
    newCategory.items.push(item._id);
    await newCategory.save();

    const oldCategory = await MenuCategory.findById(item.category).exec();
    if (oldCategory) {
      oldCategory.items = oldCategory.items.filter((i) => !i._id.equals(item._id));
      await oldCategory.save();
    }
  }

  await item.save();
  return { ...item._doc, id: item._id.toString() };
};

const deleteMenuItem = async function (id) {
  validateArgs({ id });

  await connect();

  const item = await MenuItem.findByIdAndRemove(id).exec();
  if (!item) {
    throw getError(itemNotFound);
  }

  const category = await MenuCategory.findById(item.category).exec();
  if (category) {
    category.items = category.items.filter((i) => !i._id.equals(item._id));
    await category.save();
  }
};

module.exports = {
  getMenu,
  createMenuCategory,
  editMenuCategory,
  deleteMenuCategory,
  createMenuItem,
  editMenuItem,
  deleteMenuItem,
};
