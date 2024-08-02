import React from 'react';

const Preview = ({ elements, layout, background, selectedElement, setSelectedElement }) => {
  const renderElement = (element, index) => {
    const isSelected = selectedElement !== null && selectedElement.join(',') === index.join(',');
    const baseClass = `${element.classes.join(' ')} ${isSelected ? 'border-2 border-black' : ''}`;

    if (element.type === 'container') {
      return (
        <div
          key={index.join(',')}
          className={`relative ${baseClass}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(index);
          }}
        >
          {element.children.map((child, childIndex) => renderElement(child, [...index, childIndex]))}
        </div>
      );
    } else {
      const Component = element.type === 'header' ? 'h1' : 'p';
      return (
        <Component
          key={index.join(',')}
          className={`relative ${baseClass}`}
          style={{ fontSize: `${element.fontSize}px`, fontFamily: element.fontStyle, color: element.color }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(index);
          }}
        >
          {element.text}
        </Component>
      );
    }
  };

  return (
    <div className={`${layout} ${background} p-4 rounded min-h-[400px]`}>
      {elements.map((element, index) => renderElement(element, [index]))}
    </div>
  );
};

export default Preview;
