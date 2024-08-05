import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AiImageHtml from "./components/AiImagehtml";
import AiTextHtml from "./components/AiTexthtml";
import AiImageRe from "./components/AiImagetable";
import Home from "./Home";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <nav className="bg-gray-600 p-2 flex justify-between rounded-xl justify-items-center items-center mb-4 px-10">
          <h1 className="text-2xl font-bold">HTML Builder</h1>
          <ul className="flex space-x-4">
          <li>
              <Link to="/" className="text-white hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/ai-img" className="text-white hover:underline">AI Image</Link>
            </li>
            <li>
              <Link to="/ai-text" className="text-white hover:underline">AI Text</Link>
            </li>
            <li>
              <Link to="/ai-re" className="text-white hover:underline">AI Text</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-img" element={<AiImageHtml />} />
          <Route path="/ai-text" element={<AiTextHtml />} />
          <Route path="/ai-re" element={<AiImageRe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
