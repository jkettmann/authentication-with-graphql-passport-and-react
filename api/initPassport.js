import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';
import FacebookStrategy from 'passport-facebook';
import uuid from 'uuid/v4';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const initPassport = ({ User }) => {
  passport.use(
    new GraphQLLocalStrategy((email, password, done) => {
      const users = User.getUsers();
      const matchingUser = users.find(user => email === user.email && password === user.password);
      const error = matchingUser ? null : new Error('no matching user');
      done(error, matchingUser);
    }),
  );

  const facebookCallback = (accessToken, refreshToken, profile, done) => {
    const users = User.getUsers();
    const matchingUser = users.find(user => user.facebookId === profile.id);

    if (matchingUser) {
      done(null, matchingUser);
      return;
    }

    const newUser = {
      id: uuid(),
      facebookId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails && profile.emails[0] && profile.emails[0].value,
    };
    users.push(newUser);
    done(null, newUser);
  };

  passport.use(new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:4000/auth/facebook/callback',
      profileFields: ['id', 'email', 'first_name', 'last_name'],
    },
    facebookCallback,
  ));

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
