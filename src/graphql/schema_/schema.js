const graphql = require('graphql');

const { GraphQLSchema, GraphQLString, GraphQLList } = graphql;


const menuCategoryType = new GraphQLObjectType({
    name: 'MenuCategory',
    fields: {
        title: { type: GraphQLString },
        items: { type: menuItemType}
    }
});

const menuItemType = GraphQLObjectType({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      menu: {
        type: GraphQLList(menuCategoryType),
        resolve: (_, {id}) => {
          return null;
        }
      }
    }
  });

const schema = new GraphQLSchema({query: queryType});

module.exports = schema;