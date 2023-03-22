// App.js
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OnboardingChat from './OnboardingChat';
import WorkoutTable from './WorkoutTable';
import useAuth from './useAuth';

const theme = createTheme({
  // Your theme customizations
});

function App() {
  const [workoutPlan, setWorkoutPlan] = useState(null);

  const onWorkoutPlanGenerated = (plan) => {
    setWorkoutPlan(plan);
  };

  // Replace your existing script with a useEffect hook
  useEffect(() => {
    // Your existing script code
  }, []);
  const { user, signInWithGoogle, signOutUser } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <h1>Workout Tracker</h1>
        <AuthButtons signInWithGoogle={signInWithGoogle} signOut={signOutUser} isSignedIn={!!user} />   
      {!!user && <> 
       <OnboardingChat onWorkoutPlanGenerated={onWorkoutPlanGenerated} />
        <WorkoutTable workoutPlan={workoutPlan} />
        </>
      }
      </Container>
    </ThemeProvider>
  );
}

export default App;
