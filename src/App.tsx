// App.js
import React, { useState } from 'react';
import OnboardingChat from './OnboardingChat';
import WorkoutTable from './WorkoutTable';
import useAuth from './useAuth';
import AuthButtons from './AuthButtons';
import useSavedPlan from './hooks/useSavedPlan';
export type Exercise = {
  name: string;
  reps: number;
  comment: string;
  rating: number;
};
export type Workout = {
  day: number;
  exercises: Exercise[];
  description: string;
};
export type WorkoutPlan = {
  workouts: Workout[];
};

function App() {
  const [workoutPlan, setWorkoutPlan] = useState<null | WorkoutPlan>(null);
  const { workoutPlan: savedPlan } = useSavedPlan();

  const onWorkoutPlanGenerated = (plan: WorkoutPlan) => {
    setWorkoutPlan(plan);
  };
  const { user, signInWithGoogle, signOutUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center py-6">Workout Tracker</h1>
      <AuthButtons
        signInWithGoogle={signInWithGoogle}
        signOut={signOutUser}
        isSignedIn={!!user}
      />
      {!!user && (
        <>
          {workoutPlan == null && savedPlan == null && (
            <OnboardingChat onWorkoutPlanGenerated={onWorkoutPlanGenerated} />
          )}
          {workoutPlan != null ||
            (savedPlan != null && (
              <WorkoutTable workoutPlan={workoutPlan || savedPlan} />
            ))}
        </>
      )}
    </div>
  );
}

export default App;
