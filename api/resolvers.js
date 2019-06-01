const resolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      console.log('get current user');
    },
  },
  Mutation: {
    signup: (parent, { firstName, lastName, email, password }, context) => {
      console.log('signup', firstName, lastName, email, password);
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
