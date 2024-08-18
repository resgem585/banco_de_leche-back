const { createYoga } = require('graphql-yoga');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const db = require('./db');

// Cargar el esquema desde schema.graphql
const typeDefs = loadSchemaSync(path.join(__dirname, 'graphql/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

// Combinar el esquema con los resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

// Crear el servidor GraphQL Yoga
const yoga = createYoga({
  schema, // Pasar el esquema combinado aquí
  graphqlEndpoint: '/', // Configura la ruta para que la UI de GraphQL esté en la raíz
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000');
});
