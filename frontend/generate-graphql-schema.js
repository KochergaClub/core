const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql');

const fs = require('fs');

const introspectionSchemaResult = JSON.parse(fs.readFileSync('/dev/stdin'));

const graphqlSchemaObj = buildClientSchema(introspectionSchemaResult.data);
const sdlString = printSchema(graphqlSchemaObj);

fs.writeFileSync('./schema.graphql', sdlString);
