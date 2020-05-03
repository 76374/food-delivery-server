const menuModel = require('../model/menu');

module.exports = {
    menu: async function(args, request) {
        return await menuModel.getMenu();
    },
    createMenuItem: async function(args, request) {
        const { title, price, menuCategory } = args.createItemInput;
        return await menuModel.createMenuItem(title, price, menuCategory);
    }
};