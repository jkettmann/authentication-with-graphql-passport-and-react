import uuid from 'uuid/v4';

const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('get current user');
    },
  },
  Mutation: {
    signup: (parent, { firstName, lastName, email, password }, context) => {
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

      return { user: newUser };
    },
    login: async (parent, { email, password }, context) => {
      const { user } = await context.authenticate('graphql-local', { email, password });
      return { user }
    },
    logout: (parent, args, context) => {
      console.log('logout');
    },
  },
};

export default resolvers;
