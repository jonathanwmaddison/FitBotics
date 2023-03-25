import { useEffect } from 'react'
import firebase from '../firebase';
import useAuth from '../useAuth';
const useSavedPlan = () => {
 const { user } = useAuth();
 const [workoutPlan, setWorkoutPlan] = useState([])
 useEffect(() => {
    if (!user) return;

    const workoutPlanRef = firebase
      .firestore()
      .collection('workoutPlans')
      .doc(user.uid);

    const unsubscribe = workoutPlanRef.onSnapshot((doc) => {
      if (doc.exists) {
        setWorkoutPlan(doc.data().workoutPlan);
      }
    });

    return () => unsubscribe();
  }, [user])
  return [workoutPlan]
}
export default useSavedPlan;