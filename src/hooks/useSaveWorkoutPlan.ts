import { useState } from 'react';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import useAuth from '../useAuth';

export const useSaveWorkoutPlan = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const saveWorkoutPlan = async (workoutPlan: any) => {
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
      setError(null);
    } finally {
      setSaving(false);
    }
  };

  return { saveWorkoutPlan, saving, error };
};
