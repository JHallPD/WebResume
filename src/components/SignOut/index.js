import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button type="button" className="signOutBtn" onClick={firebase.doSignOut}>
        Sign Out
  </button>
);

export default withFirebase(SignOutButton);