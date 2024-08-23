import path from 'path';
import { fileURLToPath } from 'url';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import db from './db.js';

// Definir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
