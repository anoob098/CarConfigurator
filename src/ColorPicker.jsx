import React, { useState } from 'react';
import './ColorPicker.css';

const ColorPicker = ({ onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  
  const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Yellow', hex: '#FCE205' },
    { name: 'Orange', hex: '#FF5F1F' },
    { name: 'Blue', hex: '#1E90FF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Black', hex: '#000000' },
    // { name: 'Green', hex: '#C0C0C0' },
    // { name: 'Purple', hex: '#9933FF' }
  ];
  
  const handleColorSelect = (colorHex) => {
    setSelectedColor(colorHex);
    onColorChange('BODY COLOR', colorHex);
  };
  
  return (
    <div className="color-picker">
      <div className="tabs">
        <div className="tab active">BODY COLOR</div>
      </div>
      <div className="color-options">
        {colors.map((color, index) => (
          <div 
            key={index}
            className={`color-option ${selectedColor === color.hex ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorSelect(color.hex)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
