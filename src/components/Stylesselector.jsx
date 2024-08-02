import React, { useState } from 'react';

const StyleSelector = ({ element, updateElement }) => {
  const [customClass, setCustomClass] = useState('');
  const textAlignments = ['text-left', 'text-center', 'text-right', 'text-justify'];
  const flexClasses = ['flex', 'flex-row', 'flex-col', 'items-center', 'justify-center', 'space-x-4', 'space-y-4'];

  const addCustomClass = () => {
    if (customClass && !element.classes.includes(customClass)) {
      updateElement({ classes: [...element.classes, customClass] });
      setCustomClass('');
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Style Selector</h2>
      <div className="space-y-4">
        {element.type !== 'container' && (
          <>
            <div>
              <label className="block mb-2">Text</label>
              <input
                type="text"
                value={element.text}
                onChange={(e) => updateElement({ text: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Font Size</label>
              <input
                type="number"
                value={element.fontSize}
                onChange={(e) => updateElement({ fontSize: parseInt(e.target.value, 10) })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Font Style</label>
              <select
                value={element.fontStyle}
                onChange={(e) => updateElement({ fontStyle: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Color</label>
              <input
                type="color"
                value={element.color}
                onChange={(e) => updateElement({ color: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Text Alignment</label>
              <div className="flex space-x-2">
                {textAlignments.map((alignment) => (
                  <button
                    key={alignment}
                    onClick={() => {
                      const newClasses = element.classes.filter(c => !textAlignments.includes(c));
                      newClasses.push(alignment);
                      updateElement({ classes: newClasses });
                    }}
                    className={`px-2 py-1 rounded ${
                      element.classes.includes(alignment) ? 'bg-blue-500 text-white' : 'bg-gray-600'
                    }`}
                  >
                    {alignment.replace('text-', '').charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        <div>
          <label className="block mb-2">Flexbox</label>
          <div className="flex flex-wrap gap-2">
            {flexClasses.map((flexClass) => (
              <button
                key={flexClass}
                onClick={() => {
                  const newClasses = element.classes.includes(flexClass)
                    ? element.classes.filter(c => c !== flexClass)
                    : [...element.classes, flexClass];
                  updateElement({ classes: newClasses });
                }}
                className={`px-2 py-1 rounded ${
                  element.classes.includes(flexClass) ? 'bg-blue-500 text-white' : 'bg-gray-600'
                }`}
              >
                {flexClass}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2">Custom Class</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customClass}
              onChange={(e) => setCustomClass(e.target.value)}
              placeholder="Enter custom class"
              className="flex-grow p-2 bg-gray-700 rounded"
            />
            <button
              onClick={addCustomClass}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-2">Applied Classes</label>
          <div className="flex flex-wrap gap-2">
            {element.classes.map((cls, index) => (
              <span key={index} className="inline-block bg-blue-500 text-white px-2 py-1 rounded">
                {cls}
                <button
                  onClick={() => updateElement({ classes: element.classes.filter(c => c !== cls) })}
                  className="ml-2 text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;