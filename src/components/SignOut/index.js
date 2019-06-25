import React from 'react';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';
import '../../index.css';
//simple signout button that signs the user out with a firebase command
const SignOutButton = ({ firebase }) => (
    <Button type="button" variant="danger" className="signOutBtn" onClick={firebase.doSignOut}>
        Sign Out
  </Button>
);

export default withFirebase(SignOutButton);