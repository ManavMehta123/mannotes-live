
import React, { useState } from 'react';
import axios from 'axios';

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/ai/chat', { message: input });
      const botReply = { role: 'assistant', content: res.data.reply };
      setMessages(prev => [...prev, botReply]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error fetching response.' }]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, width: 300, backgroundColor: '#f1f1f1', border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close AI Chat' : 'Open AI Chat'}
      </button>
      {isOpen && (
        <div style={{ marginTop: 10 }}>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: '5px 0', color: msg.role === 'user' ? 'blue' : 'green' }}>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ width: '80%' }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;
