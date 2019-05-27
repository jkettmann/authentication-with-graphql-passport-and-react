import React from 'react';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from './queries';
import { LOGOUT_MUTATION } from './mutations';

const updateCacheAfterLogout = (cache) => {
  cache.writeQuery({
    query: CURRENT_USER_QUERY,
    data: { currentUser: null },
  });
};

const LogoutButton = () => (
  <Mutation
    mutation={LOGOUT_MUTATION}
    update={updateCacheAfterLogout}
  >
    {(logout) => (
      <button onClick={logout}>
        Logout
      </button>
    )}
  </Mutation>
);

export default LogoutButton;
