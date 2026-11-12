'use client';

import React, { useState } from 'react';

function InputWithSend() {
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
        placeholder="name@gmail.com"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ flex: 1 }}
      />
      <button onClick={handleSend} className='send-btn'>
        Send
      </button>
    </div>
  );
}

export default InputWithSend;
