const fs = require('fs');
const path = require('path');
const { buildSchema } = require('graphql');

const getSchema = () => {
  const filePath = path.join(process.cwd(), 'src', 'graphql', 'schema.graphql');
  return fs.readFileSync(filePath, 'utf8');
};

module.exports = buildSchema(getSchema());
