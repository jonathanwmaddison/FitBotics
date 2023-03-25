import { useCallback, useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import useAuth from '../useAuth';

const useSavedPlan = () => {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth()

    const getWorkoutPlan = useCallback(() => {
        setLoading(true);
        setError(null);

        const db = getFirestore();
  
        const workoutPlansRef = query(
            collection(db, 'workoutPlans'),
            where('createdBy', '==', user.uid),
          );
        const unsubscribe = onSnapshot(workoutPlansRef, (snapshot) => {
            const plans = [];
            snapshot.forEach((doc) => {
                plans.push(doc.data().workoutPlan);
            });
            if (plans.length > 0) {
                setWorkoutPlan(plans[0]); // Only return the first plan
            } else {
                setWorkoutPlan(null);
            }
            setLoading(false);
        }, (err) => {
            console.log(err)
            setError(err.message);
            setLoading(false);
        });
        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = getWorkoutPlan();
        return unsubscribe;
    }, [user, getWorkoutPlan]);

    return { workoutPlan, loading, error };
};

export default useSavedPlan;
