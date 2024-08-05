import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image file first');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch('https://api.kythonlk.com/api/img', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const text = await res.text();
      console.log('Response text:', text);

      const cleanedText = text.replace(/```html|```$/g, '').trim();
      setResponse(cleanedText);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100/50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Upload Image</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-medium file:bg-gray-200 file:text-gray-900 hover:file:bg-gray-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-lg shadow-sm focus:outline-none ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
            }`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Response:</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-t-2 border-indigo-600 border-solid rounded-full animate-spin"></div>
            <p className="ml-4 text-gray-500">Loading...</p>
          </div>
        ) : (
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">{response}</pre>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
