import expressGraphql from 'express-graphql';
import schema from './schema';
import resolver from './resolvers';
import errorFormat from './errorFormat';


export default expressGraphql({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
  customFormatErrorFn: errorFormat
});
