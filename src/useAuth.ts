// useAuth.js
import { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebase from './firebase';

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

const useAuth = (): {
  signInWithGoogle: () => void;
  signOutUser: () => void;
  user: User | null;
} => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { user, signInWithGoogle, signOutUser };
};

export default useAuth;
