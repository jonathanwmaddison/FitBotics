import { useCallback, useEffect, useState } from 'react'
import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';

import useAuth from '../useAuth';
const useSavedPlan = () => {
    const { user } = useAuth();
    const [workoutPlan, setWorkoutPlan] = useState([])

    const getWorkoutPlan = useCallback(() => {
        const workoutPlanRef = getDoc(collection('users', user.id, 'workoutPlans'))
        const unsubscribe = workoutPlanRef.onSnapshot((doc) => {
            if (doc.exists) {
                setWorkoutPlan(doc.data().workoutPlan);
            }
        });
        return () => unsubscribe();
    }, [user])

    useEffect(() => {
        if (!user) return;

        return getWorkoutPlan()
    
    }, [user])
    return [workoutPlan]
}
export default useSavedPlan;