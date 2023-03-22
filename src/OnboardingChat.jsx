// OnboardingChat.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function OnboardingChat({ onWorkoutPlanGenerated }) {
  const [userData, setUserData] = useState([]);
  const [inputValue, setInputValue] = useState('');

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
      const prompt = `Generate a personalized workout plan for a person with the following goals: "${userData[0]}", age: ${userData[1]}, and fitness level: "${inputValue}". Provide the plan as JSON structured data for 5 weeks, including a dynamic list of exercises tailored to the user's goals and fitness level. The JSON structure should be:

{
  "workouts": [
    {
      "week": "integer (1-5)",
      "day": "integer (1-7)",
      "exercises": [
        {
          "name": "string (exercise name)",
          "reps": "integer (number of repetitions)"
        },
        ...
      ],
      "description": "string (workout description)"
    },
    ...
  ]
}

Please return only the JSON object as the response.`;

      try {
        const response = await axios.post('/.netlify/functions/chat', { prompt });
        const jsonResponse = JSON.parse(response.data.choices[0].text);
        onWorkoutPlanGenerated(jsonResponse);
      } catch (error) {
        console.error('Error fetching workout plan:', error);
      }
    }
  };

  return (
    <div>
      <TextField
        label="Enter your info"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default OnboardingChat;