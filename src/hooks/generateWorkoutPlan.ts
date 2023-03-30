import axios from 'axios';

async function generateWorkoutPlan(userData: string[]) {
  const prompt = `A json object with the properties: 
    { "workouts": [{"day": "integer (1-7)", "exercises": [{ "name": "string (exercise name)", "reps": "string (number of repetitions and sets- specify if a time quantity)" },
        ...
      ],
      "description": "string (description for the day with tips. vary this description to the specific day. Don't repeat too much.)"
    },
    ...
     ]
    }
    
    The json object should detail a 1 week workout plan for someone with  1. goals: "${userData[0]}", 2. age: ${userData[1]}, and 3. fitness level: "${inputValue}".`;

  try {
    const response = await axios.post(
      'https://us-central1-fitbotics-230d2.cloudfunctions.net/chat',
      { prompt },
    );
    console.log(response);
    return JSON.parse(response.data.text);
  } catch (error) {
    console.error('Error fetching workout plan:', error);
  }
}
export default generateWorkoutPlan;
