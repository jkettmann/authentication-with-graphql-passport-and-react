import uuid from 'uuid/v4';

const resolvers = {
  Query: {
    currentUser: (parent, args, context) => context.user,
  },
  Mutation: {
    signup: async (parent, { firstName, lastName, email, password }, context) => {
      const existingUsers = context.User.getUsers();
      const userWithEmailAlreadyExists = !!existingUsers.find(user => user.email === email);

      if (userWithEmailAlreadyExists) {
        throw new Error('User with email already exists');
      }

      const newUser = {
        id: uuid(),
        firstName,
        lastName,
        email,
        password,
      };

      context.User.addUser(newUser);

      context.login(newUser);

      return { user: newUser };
    },
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      context.login(user);
      return { user }
    },
    logout: (parent, args, context) => context.logout(),
  },
};

export default resolvers;
