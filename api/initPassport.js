import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';

const initPassport = ({ User }) => {
  passport.use(
    new GraphQLLocalStrategy((email, password, done) => {
      const users = User.getUsers();
      const matchingUser = users.find(user => email === user.email && password === user.password);
      const error = matchingUser ? null : new Error('no matching user');
      done(error, matchingUser);
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const users = User.getUsers();
    const matchingUser = users.find(user => user.id === id);
    done(null, matchingUser);
  });
};

export default initPassport;
