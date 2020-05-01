const menuModel = require('../model/menu');

module.exports = {
    createMenuItem: async function(args, request) {
        console.log(args.title, args.price);
        const { title, price, menucategory } = args.createItemInput;
        const createdUtem = await menuModel.createMenuItem(title, price);
        return createdUtem;
    }
};