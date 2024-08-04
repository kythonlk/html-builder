import React, { useState } from 'react';

const TextPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Set loading to true when starting the request

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
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100/50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Send Text Prompt</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={handleChange}
            rows="8"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="Enter your prompt here"
          />
          <div className="absolute top-2 right-2 text-gray-500">
            <span className="text-sm font-medium">{prompt.length}/500</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
      {loading && (
        <div className="mt-4 text-center">
          <div className="w-6 h-6 border-t-2 border-indigo-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading...</p>
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Response:</h2>
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">{response}</pre>
      </div>
    </div>
  );
};

export default TextPrompt;
