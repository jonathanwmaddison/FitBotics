import { useState } from 'react';
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import useAuth from '../useAuth';

export const useSaveWorkoutPlan = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const saveWorkoutPlan = async (workoutPlan) => {
    setSaving(true);
    setError(null);

    try {
      if (user) {
        const db = getFirestore();
        const userWorkoutPlanRef = doc(db, 'workoutPlans', user.uid);
        await setDoc(userWorkoutPlanRef, { workoutPlan });
      } else {
        throw new Error('User not authenticated');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { saveWorkoutPlan, saving, error };
};
