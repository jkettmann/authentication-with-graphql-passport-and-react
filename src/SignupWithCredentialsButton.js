import React from 'react';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from './queries';
import { SIGNUP_MUTATION } from './mutations';

const updateCacheAfterSignup = (cache, { data: { signup }}) => {
  cache.writeQuery({
    query: CURRENT_USER_QUERY,
    data: { currentUser: signup.user },
  });
};

const SignupWithCredentialsButton = () => (
  <Mutation
    mutation={SIGNUP_MUTATION}
    variables={{
      firstName: 'Jen',
      lastName: 'Barber',
      email: 'jen@barber.com',
      password: 'qwerty'
    }}
    update={updateCacheAfterSignup}
  >
    {(login) => (
      <button onClick={login}>
        Signup as Jen Barber
      </button>
    )}
  </Mutation>
);

export default SignupWithCredentialsButton;
