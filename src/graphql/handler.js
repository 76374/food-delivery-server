const expressGraphql = require('express-graphql');
const schema = require('./schema');
const resolver = require('./resolvers');

module.exports = expressGraphql({
  schema: schema,
  rootValue: resolver,
  graphiql: true
});
