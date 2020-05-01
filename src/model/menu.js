//const MenuCategory = require('../mongoose/menuCategory')
const MenuItem = require('../mongoose/menuItem');

module.exports = {
    /* getCategoryByTitle: async function(title) {
        const cat = await MenuCategory.findOne({title: title});
        return cat;
    }*/

    createMenuItem: async function(title, price) {
        const item = new MenuItem({
            title, price
        });
        const createdItem = await item.save();
        return createdItem._doc;
    }
} 