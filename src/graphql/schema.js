const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        menu: [MenuCategory]!
    }

    type Mutation {
        createMenuItem(input: CreateMenuItemInput): MenuItem
        createOrder(input: CreateOrderInput): String
    }

    type MenuCategory {
        title: String!
        items: [MenuItem]!
    }

    type MenuItem {
        id: String!
        title: String!
        price: Float!
    }

    input CreateMenuItemInput {
        title: String!
        price: Float!
        menuCategory: String!
    }

    input CreateOrderInput {
        items: [String]!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
