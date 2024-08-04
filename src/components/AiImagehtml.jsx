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
      const res = await fetch('http://localhost:3001/api/img', {
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
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div>
        <h2>Response:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre dangerouslySetInnerHTML={{ __html: response }} />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
