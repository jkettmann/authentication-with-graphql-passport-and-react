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
      console.log('login', email, password);
    },
    logout: (parent, args, context) => {
      console.log('logout');
    },
  },
};

export default resolvers;
