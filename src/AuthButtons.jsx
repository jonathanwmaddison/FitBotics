// AuthButtons.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const AuthButtons = ({ signInWithGoogle, signOut, isSignedIn }) => {
  return (
    <>
      <button
        className="btn btn-primary btn-active"
        onClick={signInWithGoogle}
        style={{ display: isSignedIn ? 'none' : 'inline-flex' }}
      >
        <FcGoogle className="inline mr-2" />
        Sign in with Google
      </button>
      <button
        className="btn btn-outline btn-primary"
        onClick={signOut}
        style={{ display: isSignedIn ? 'inline-flex' : 'none' }}
      >
        Sign out
      </button>
    </>
  );
};

export default AuthButtons;
