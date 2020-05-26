const MenuCategory = require('../mongoose/menuCategory');
const MenuItem = require('../mongoose/menuItem');
const connect = require('../mongoose/connect');
const errors = require('../utils/errors');
const { modelToPlainObject } = require('./util');

const addItemToCategory = async function (itemId, categoryTitle) {
  let category = await MenuCategory.findOne({ title: categoryTitle });
  if (category) {
    category.items.push(itemId);
  } else {
    category = new MenuCategory({
      title: categoryTitle,
      items: [itemId],
    });
  }
  await category.save();
};

const deleteItemFromCategory = async function (category, itemId) {
  if (category.items.length <= 1) {
    await MenuCategory.remove(category);
  } else {
    category.items = category.items.filter((i) => !itemId.equals(i));
    await category.save();
  }
};

const moveItemToCategory = async function (itemId, categoryTitle) {
  const currentCategory = await MenuCategory.findOne({ items: itemId });
  if (currentCategory) {
    if (currentCategory.title === categoryTitle) {
      // the item is already there
      return false;
    }
    await deleteItemFromCategory(currentCategory, itemId);
  }
  await addItemToCategory(itemId, categoryTitle);
  return true;
};

const getMenu = async function () {
  await connect();

  const categories = await MenuCategory.find({}).populate('items');
  return categories.map(cat => modelToPlainObject(cat, 'items'))
};

const createMenuItem = async function (title, price, categoryTitle) {
  await connect();

  const item = new MenuItem({
    title,
    price,
  });
  const createdItem = await item.save();

  await addItemToCategory(createdItem._id, categoryTitle);

  return { ...createdItem._doc, id: createdItem._id.toString() };
};

const editMenuItem = async function (id, title, price, categoryTitle) {
  await connect();

  const item = await MenuItem.findById(id);
  if (!item) {
    throw errors.getUnexpectedArgs('wrong id');
  }

  if (title) {
    item.title = title;
  }
  if (price || price === 0) {
    item.price = price;
  }
  if (categoryTitle) {
    moveItemToCategory(item._id, categoryTitle);
  }

  await item.save();
  return { ...item._doc, id: item._id.toString() };
};

const deleteMenuItem = async function (id) {
  await connect();

  const item = await MenuItem.findByIdAndRemove(id).exec();
  if (!item) {
    return false;
  }

  const category = await MenuCategory.findOne({ items: item._id });
  if (category) {
    await deleteItemFromCategory(category, item._id);
  }
  return true;
};

module.exports = {
  getMenu,
  createMenuItem,
  editMenuItem,
  deleteMenuItem
};
