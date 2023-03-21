// Chatbot.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/.netlify/functions/generate-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('An error occurred while generating a response.');
    }
  };

    return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Typography variant="h4" mb={2}>
        Chat with Workout Bot
      </Typography>
      <TextField
        label="Your Message"
        variant="outlined"
        value={message}
        onChange={handleMessageChange}
        sx={{ width: '100%', maxWidth: 400 }}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Send
      </Button>
      {response && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            width: '100%',
            maxWidth: 400,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            Workout Bot says:
          </Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Chatbot


