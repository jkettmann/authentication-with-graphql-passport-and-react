import express from 'express';
import passport from 'passport';
import { buildContext } from 'graphql-passport';
import { ApolloServer } from 'apollo-server-express';
import User from './User';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

import initPassport from './initPassport';

const PORT = 4000;

initPassport({ User });

const app = express();
app.use(passport.initialize());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
