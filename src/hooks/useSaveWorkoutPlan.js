import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const useSaveWorkoutPlan = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveWorkoutPlan = async (workoutPlan) => {
    setSaving(true);
    setError(null);

    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'workoutPlans'), {
          createdAt: new Date().toISOString(),
          workoutPlan,
        });
      } else {
        throw new Error('User not authenticated');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { saveWorkoutPlan, saving, error };
};