const mongoose = require('mongoose');

const MenuCategory = require('../mongoose/menuCategory');
const MenuItem = require('../mongoose/menuItem');
const errors = require('../utils/errors');

const menuItemToPlainObject = (menuItem) => {
  return {
    id: menuItem._id.toString(),
    title: menuItem.title,
    price: menuItem.price,
  };
};

const menuCategoryToPlainObject = (menuCategory) => {
  return {
    id: menuCategory._id.toString(),
    title: menuCategory.title,
    items: menuCategory.items.map((item) =>
      item instanceof MenuItem ? menuItemToPlainObject(item) : item.toString()
    ),
  };
};

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

const moveItemToCategory = async function (itemId, categoryTitle) {
  const currentCategory = await MenuCategory.findOne({ items: itemId });
  if (currentCategory) {
    if (currentCategory.title === categoryTitle) {
      // the item is already there
      return false;
    }
    if (currentCategory.items.length <= 1) {
      await MenuCategory.remove(currentCategory);
    } else {
      currentCategory.items = currentCategory.items.filter((i) => !itemId.equals(i));
      await currentCategory.save();
    }
  }
  addItemToCategory(itemId, categoryTitle);
  return true;
};

const getMenu = async function () {
  const categories = await MenuCategory.find({}).populate('items');
  return categories.map((cat) => menuCategoryToPlainObject(cat));
};

const createMenuItem = async function (title, price, categoryTitle) {
  const item = new MenuItem({
    title,
    price,
  });
  const createdItem = await item.save();

  await addItemToCategory(createdItem._id, categoryTitle);

  return { ...createdItem._doc, id: createdItem._id.toString() };
};

const editMenuItem = async function (id, title, price, categoryTitle) {
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

module.exports = {
  getMenu,
  createMenuItem,
  editMenuItem,
};
