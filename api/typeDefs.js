import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: String
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    currentUser: User
  }

  type AuthPayload {
    user: User
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;

export default typeDefs;
