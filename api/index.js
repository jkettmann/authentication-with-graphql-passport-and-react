import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import cors from 'cors';
import passport from 'passport';
import { buildContext } from 'graphql-passport';
import { ApolloServer } from 'apollo-server-express';
import User from './User';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

import initPassport from './initPassport';

const PORT = 4000;
const SESSION_SECRECT = 'bad secret';

initPassport({ User });

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
  // use secure cookies for production meaning they will only be sent via https
  //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

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

server.applyMiddleware({ app, cors: false });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
