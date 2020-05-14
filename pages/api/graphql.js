import { graphql } from 'graphql';

import schema from '../../src/graphql/schema';
import root from '../../src/graphql/resolvers';

export default async (req, res) => {
  const { query, variables } = req.body;
  const response = await graphql(schema, query, root, null, variables);
  return res.json(response);
};
