import { useCallback, useEffect, useState } from 'react';
import { getFirestore, onSnapshot, doc } from 'firebase/firestore';
import useAuth from '../useAuth';
import { WorkoutPlan } from '../App';

const useSavedPlan = (): {
  workoutPlan: WorkoutPlan | null;
  loading: boolean;
  error: string | null;
} => {
  const [workoutPlan, setWorkoutPlan] = useState<null | WorkoutPlan>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { user } = useAuth();

  const getWorkoutPlan = useCallback(() => {
    console.log('running');
    setLoading(true);
    setError(null);

    const db = getFirestore();
    const workoutPlanRef = doc(db, 'workoutPlans', user?.uid || '');

    const unsubscribe = onSnapshot(
      workoutPlanRef,
      (workoutPlanSnapshot) => {
        if (workoutPlanSnapshot.exists()) {
          setWorkoutPlan(workoutPlanSnapshot.data().workoutPlan);
        } else {
          setWorkoutPlan(null);
        }
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = getWorkoutPlan();
    return unsubscribe;
  }, [user, getWorkoutPlan]);
  console.log(workoutPlan);
  return { workoutPlan, loading, error };
};

export default useSavedPlan;
