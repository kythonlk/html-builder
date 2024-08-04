import React, { useState } from 'react';

const TextPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    try {
      const res = await fetch('http://localhost:3001/api/text', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to send prompt');
      }

      const text = await res.text(); 
      console.log('Response text:', text);
  
      const cleanedText = text.replace(/```html|```$/g, '').trim();
  
      setResponse(cleanedText);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error sending prompt');
    }
  };

  return (
    <div>
      <h1>Send Text Prompt</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          rows="4"
          cols="50"
          placeholder="Enter your prompt here"
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default TextPrompt;

