const MenuCategory = require('../mongoose/menuCategory');
const MenuItem = require('../mongoose/menuItem');

const menuItemToPlainObject = (menuItem) => {
  return {
    id: menuItem._id.toString(),
    title: menuItem.title,
    price: menuItem.price
  }
};

const menuCategoryToPlainObject = (menuCategory) => {
  return {
    id: menuCategory._id.toString(),
    title: menuCategory.title,
    items: menuCategory.items.map(
      (item) => item instanceof MenuItem ? menuItemToPlainObject(item) : item.toString())
  }
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

  let category = await MenuCategory.findOne({ title: categoryTitle });
  if (category) {
    category.items.push(createdItem._id);
  } else {
    category = new MenuCategory({
      title: categoryTitle,
      items: [createdItem._id],
    });
  }
  await category.save();

  return { ...createdItem._doc };
};

module.exports = {
  getMenu,
  createMenuItem,
};
