// OnboardingChat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSaveWorkoutPlan } from './hooks/useSaveWorkoutPlan';
function OnboardingChat({ onWorkoutPlanGenerated }) {
  const [userData, setUserData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const userQueries = ["goals", "age", "fitness level"];
  const { saveWorkoutPlan, saving, error } = useSaveWorkoutPlan();

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

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { type: 'user', message: inputValue },
    ]);    
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
  useEffect(() => {
    if (userData.length < 3) {
      setChatMessages((prevChatMessages) => [
        ...prevChatMessages,
        {
          type: 'bot',
          message: `Please enter your ${userQueries[userData.length]}:`,
        },
      ]);
    }
  }, [userData]);
  return (
    
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl p-4 space-y-4">
            {chatMessages.map((chatMessage, index) => (
              <div
                key={index}
                className={`chat-message ${
                  chatMessage.type === 'user' ? 'chat-author' : 'chat-bot'
                }`}
              >
                <div className="flex-none">{chatMessage.type === 'user' ? 'You' : 'Bot'}</div>
                <div className="text-sm">{chatMessage.message}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Type your answer here..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className={`btn btn-primary ${userData.length > 2 ? 'opacity-50' : ''}`}
              onClick={handleSubmit}
              disabled={userData.length > 2}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
}

export default OnboardingChat;
