import fs from 'fs';
import path from 'path';
import { buildSchema } from 'graphql';

const getSchema = () => {
  const filePath = path.join(process.cwd(), 'src', 'graphql', 'schema.graphql');
  return fs.readFileSync(filePath, 'utf8');
};

const schema = getSchema();

export default buildSchema(schema);