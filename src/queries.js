import { gql } from 'apollo-boost';

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      id
      firstName
      lastName
      email
    }
  }
`;
