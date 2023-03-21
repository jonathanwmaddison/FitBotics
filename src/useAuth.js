// useAuth.js
import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDqpJfa32BgY4WUP6_O-3436PQ7fb3lS78",
  authDomain: "fitbotics-230d2.firebaseapp.com",
  projectId: "fitbotics-230d2",
  storageBucket: "fitbotics-230d2.appspot.com",
  messagingSenderId: "896006300545",
  appId: "1:896006300545:web:bdb854c4269d3197dd3e80",
  measurementId: "G-1T3KXCQK3J"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
