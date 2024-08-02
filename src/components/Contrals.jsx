import React from "react";

const Controls = ({
  addBlock,
  layout,
  setLayout,
  background,
  setBackground,
}) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-xl font-bold mb-2">Add Blocks</h2>
      <div className="space-y-2">
        <button
          onClick={() => addBlock("text")}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Text Block
        </button>
        <button
          onClick={() => addBlock("header")}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Header Block
        </button>
        <button
          onClick={() => addBlock("container")}
          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Container
        </button>
      </div>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Layout</h2>
      <select
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        className="w-full p-2 border rounded bg-gray-700 text-white"
      >
        <option value="container mx-auto">Container</option>
        <option value="container-fluid mx-auto">Full Width</option>
      </select>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Background</h2>
      <select
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        className="w-full p-2 border rounded bg-gray-700 text-white"
      >
        <option value="bg-white">White</option>
        <option value="bg-gray-100">Light Gray</option>
        <option value="bg-gray-200">Gray</option>
        <option value="bg-blue-100">Light Blue</option>
        <option value="bg-green-100">Light Green</option>
      </select>
    </div>
  </div>
);

export default Controls;
