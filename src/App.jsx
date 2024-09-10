import React, { useState } from "react";
import AiImageHtml from "./components/AiImagehtml";
import AiTextHtml from "./components/AiTexthtml";
import AiImageRe from "./components/AiImagetable";

function App() {
  const [currentPage, setCurrentPage] = useState('ai-img');

  const renderPage = () => {
    switch (currentPage) {
      case 'ai-img':
        return <AiImageHtml />;
      case 'ai-text':
        return <AiTextHtml />;
      case 'ai-re':
        return <AiImageRe />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <nav className="bg-gray-600 p-2 flex justify-between rounded-xl justify-items-center items-center mb-4 px-10">
        <h1 className="text-2xl font-bold">HTML Builder</h1>
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setCurrentPage('ai-img')} className="text-white hover:underline">AI Image</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('ai-text')} className="text-white hover:underline">AI Text</button>
          </li>
          <li>
            <button onClick={() => setCurrentPage('ai-re')} className="text-white hover:underline">AI recipt extractor</button>
          </li>
        </ul>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
