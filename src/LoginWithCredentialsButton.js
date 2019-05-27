import React from 'react';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from './queries';
import { LOGIN_MUTATION } from './mutations';

const updateCacheAfterLogin = (cache, { data: { login }}) => {
  cache.writeQuery({
    query: CURRENT_USER_QUERY,
    data: { currentUser: login.user },
  });
};

const LoginWithCredentialsButton = () => (
  <Mutation
    mutation={LOGIN_MUTATION}
    variables={{  email: 'maurice@moss.com', password: 'abcdefg' }}
    update={updateCacheAfterLogin}
  >
    {(login) => (
      <button onClick={login}>
        Login as Maurice Moss
      </button>
    )}
  </Mutation>
);

export default LoginWithCredentialsButton;
