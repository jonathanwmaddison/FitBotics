// AuthButtons.js
import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const AuthButtons = ({ signInWithGoogle, signOut, isSignedIn }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
        style={{ display: isSignedIn ? 'none' : 'inline-flex' }}
      >
        Sign in with Google
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={signOut}
        style={{ display: isSignedIn ? 'inline-flex' : 'none' }}
      >
        Sign out
      </Button>
    </>
  );
};

export default AuthButtons;
