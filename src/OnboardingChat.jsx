// OnboardingChat.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function OnboardingChat({ onWorkoutPlanGenerated }) {
  const [userData, setUserData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { saveWorkoutPlan, saving, error } = useSaveWorkoutPlan();

  const userQueries = ["goals", "age", "fitness level"]
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return;
    setUserData([...userData, inputValue]);
    setInputValue('');

    if (userData.length === 2) {
      const prompt = `A json object with the properties: 
    { "workouts": [{"day": "integer (1-7)", "exercises": [{ "name": "string (exercise name)", "reps": "integer (number of repetitions - specify if a time quantity)" },
        ...
      ],
      "description": "string (description for the day with tips. vary this description to the specific day. Don't repeat too much.)"
    },
    ...
     ]
   }
  
   The json object should detail a 1 week workout plan for someone with  1. goals: "${userData[0]}", 2. age: ${userData[1]}, and 3. fitness level: "${inputValue}".`;

     try {
        const response = await axios.post("https://us-central1-fitbotics-230d2.cloudfunctions.net/chat",  { prompt });
        console.log(response)
        const jsonResponse = JSON.parse(response.data.text)
        console.log(jsonResponse)
        onWorkoutPlanGenerated(jsonResponse);
        saveWorkoutPlan(jsonResponse)
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      }
    }
  };

  return (
    <div>
      <TextField 
        label={userQueries[userData.length] || 'loading plan'}
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button disabled={!!userData.length > 2} variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default OnboardingChat;
