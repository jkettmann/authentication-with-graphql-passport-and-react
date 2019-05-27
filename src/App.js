import React from 'react';
import { Query } from 'react-apollo';

import SignupWithCredentialsButton from './SignupWithCredentialsButton';
import LoginWithCredentialsButton from './LoginWithCredentialsButton';
import LogoutButton from './LogoutButton';
import { CURRENT_USER_QUERY } from './queries';

const App = () => (
  <Query query={CURRENT_USER_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error: {JSON.stringify(error)}</div>;

      if (!data.currentUser) {
        return (
          <>
            <SignupWithCredentialsButton />
            <LoginWithCredentialsButton />
          </>
        );
      }

      const {
        id,
        firstName,
        lastName,
        email,
      } = data.currentUser;

      return (
        <>
          {id}
          <br />
          {firstName} {lastName}
          <br />
          {email}

          <br />

          <LogoutButton />
        </>
      );
    }}
  </Query>
);

export default App;
