// App.js
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthButtons from './AuthButtons.jsx';
import WorkoutTable from './WorkoutTable';
import Chatbot from './Chatbot'
import useAuth from './useAuth'
const theme = createTheme({
  // Your theme customizations
});

function App() {
  // Replace your existing script with a useEffect hook
  useEffect(() => {
    // Your existing script code
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false);
const { user, signInWithGoogle, signOutUser } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <h1>Workout Tracker</h1>
        <AuthButtons signInWithGoogle={signInWithGoogle} signOut={signOutUser} isSignedIn={!!user} />
        <WorkoutTable isVisible={!!user} />
        {!!user && <Chatbot />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
