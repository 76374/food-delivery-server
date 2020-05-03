const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        menu: [MenuCategory]!
    }

    type Mutation {
        createMenuItem(createItemInput: CreateMenuItemInput): MenuItem
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

    schema {
        query: Query
        mutation: Mutation
    }
`);
