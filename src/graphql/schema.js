const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type MenuCategory {
        title: String!
        items: [MenuItem!]!
    }

    type MenuItem {
        title: String!
        price: Float!
    }

    input CreateMenuItemInput {
        title: String!
        price: Float!
        menuCategory: String!
    }

    type Query {
        test: String
    }

    type Mutation {
        createMenuItem(createItemInput: CreateMenuItemInput): MenuItem
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);