'use client';

import React, { useState } from 'react';

function InputWithSearch() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Sent message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        type="text"
        placeholder="Search here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ flex: 1 }}
      />
      <button onClick={handleSend} className='send-btn'>
        Search
      </button>
    </div>
  );
}

export default InputWithSearch;
