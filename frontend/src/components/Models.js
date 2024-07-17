import React, { useState } from 'react';
import { stockMapping } from '../stockMapping';

const Modal = ({ setSymbol }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('GOOG');
  const symbols = Object.keys(stockMapping);

  const handleSubmit = () => {
    setSymbol(selectedSymbol);
    Modal.hide();
  };

  return (
    <div id="modal" style={{ display: 'none' }}>
      <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {stockMapping[symbol]} ({symbol})
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

Modal.show = () => {
  document.getElementById('modal').style.display = 'block';
};

Modal.hide = () => {
  document.getElementById('modal').style.display = 'none';
};

export default Modal;
