// AuthButtons.js
import React from 'react';
import { GoogleIcon } from '@mui/icons-material';

const AuthButtons = ({ signInWithGoogle, signOut, isSignedIn }) => {
  return (
    <>
      <button
        className={`btn btn-primary flex items-center space-x-2 ${
          isSignedIn ? 'hidden' : 'inline-flex'
        }`}
        onClick={signInWithGoogle}
      >
        <GoogleIcon />
        <span>Sign in with Google</span>
      </button>
      <button
        className={`btn btn-outline btn-primary ${
          isSignedIn ? 'inline-flex' : 'hidden'
        }`}
        onClick={signOut}
      >
        Sign out
      </button>
    </>
  );
};

export default AuthButtons;
