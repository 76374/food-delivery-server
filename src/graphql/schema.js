const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        menu: [MenuCategory]!
    }

    type Mutation {
        createMenuItem(input: CreateMenuItemInput!): MenuItem
        editMenuItem(input: EditMenuItemInput): MenuItem
        createOrder(input: CreateOrderInput!): String
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

    input EditMenuItemInput {
        id: String!
        price: Float
        title: String
        menuCategory: String
    }

    input CreateOrderInput {
        items: [String]!
    }
`);
