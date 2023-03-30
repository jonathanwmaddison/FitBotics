import { useCallback, useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
} from 'firebase/firestore';
import useAuth from '../useAuth';

const useSavedPlan = () => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getWorkoutPlan = useCallback(() => {
    console.log('running');
    setLoading(true);
    setError(null);

    const db = getFirestore();
    const workoutPlanRef = doc(db, 'workoutPlans', user.uid);

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
