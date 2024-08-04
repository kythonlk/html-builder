import React, { useState, useEffect } from "react";
import Controls from "./components/Contrals";
import StyleSelector from "./components/Stylesselector";
import Preview from "./components/Preview";
import AiImageHtml from "./components/AiImagehtml";
import AiTextHtml from "./components/AiTexthtml";

function App() {
  const [elements, setElements] = useState([]);
  const [layout, setLayout] = useState("container mx-auto");
  const [selectedElement, setSelectedElement] = useState(null);
  const [background, setBackground] = useState("bg-white");
  const [liveHTML, setLiveHTML] = useState("");

  const addBlock = (type) => {
    const newElement = {
      type,
      text:
        type === "container"
          ? ""
          : `${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
      fontSize: 16,
      fontStyle: "Arial",
      color: "#000000",
      classes: type === "container" ? ["p-4"] : [],
      children: type === "container" ? [] : undefined,
    };
    if (
      selectedElement !== null &&
      elements[selectedElement].type === "container"
    ) {
      const updatedElements = [...elements];
      updatedElements[selectedElement].children.push(newElement);
      setElements(updatedElements);
    } else {
      setElements([...elements, newElement]);
    }
  };

  const updateElement = (index, updates) => {
    const updatedElements = [...elements];
    updateElementRecursive(updatedElements, index, updates);
    setElements(updatedElements);
  };

  const updateElementRecursive = (elements, index, updates) => {
    if (index.length === 1) {
      elements[index[0]] = { ...elements[index[0]], ...updates };
    } else {
      updateElementRecursive(
        elements[index[0]].children,
        index.slice(1),
        updates
      );
    }
  };

  const generateHTML = () => {
    const generateElementHTML = (element) => {
      if (element.type === "container") {
        return `
          <div class="${element.classes.join(" ")}">
            ${element.children.map(generateElementHTML).join(" ")}
          </div>`;
      } else {
        return `
        <${element.type === "header" ? "h1" : "p"} 
          class="${element.classes.join(" ")}"
          style="font-size: ${element.fontSize}px; font-family: ${
                  element.fontStyle
                }; color: ${element.color};"
        >
          ${element.text}
        </${element.type === "header" ? "h1" : "p"}>`;
      }
    };

    const html = `
      <div class="${layout} ${background}">
        ${elements.map(generateElementHTML).join(" ")}
      </div>`;
    return html.trim();
  };

  useEffect(() => {
    setLiveHTML(generateHTML());
  }, [elements, layout, background]);

  return (
        <div className="flex space-x-8">
          <div className="w-1/4">
            <Controls
              addBlock={addBlock}
              layout={layout}
              setLayout={setLayout}
              background={background}
              setBackground={setBackground}
            />
          </div>
          <div className="w-1/2">
            <Preview
              elements={elements}
              layout={layout}
              background={background}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
            />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Live HTML</h2>
              <pre className="bg-gray-800 p-4 rounded overflow-x-auto">
                <code>{liveHTML}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/4">
            {selectedElement !== null && (
              <StyleSelector
                element={elements[selectedElement]}
                updateElement={(updates) =>
                  updateElement([selectedElement], updates)
                }
              />
            )}
          </div>
        </div>
  );
}

export default App;
