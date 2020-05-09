import { graphql } from 'graphql';

import schema from '../../src/graphql/schema';
import root from '../../src/graphql/resolvers';

export default async (req, res) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);
  console.log(JSON.stringify(response));
  //console.log(res.setHeaders('Content-Type', 'application/json'));
  //return res.end(JSON.stringify(response));
  return res.json(response);
};
