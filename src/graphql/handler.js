const expressGraphql = require('express-graphql');
const schema = require('./schema');
const resolver = require('./resolvers');
const errorFormat = require('./errorFormat')


module.exports = expressGraphql({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
  customFormatErrorFn: errorFormat
});
