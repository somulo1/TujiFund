import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: string; text: string }[]
  >([
    { sender: 'Admin', text: 'Welcome to the support chat! How can I assist you today?' },
    { sender: 'You', text: 'I need help with my account settings.' },
    { sender: 'Admin', text: 'Sure, I can help with that. What specifically would you like to change?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  let socket: WebSocket;

  useEffect(() => {
    // Connect to WebSocket server
    socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'Admin', text: event.data }]);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.send(input);
      setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="support-chat bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Support Chat</h2>
      <div className="messages overflow-y-auto h-64 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded mb-2 ${msg.sender === 'You' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
            <span className="font-semibold">{msg.sender}:</span> {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border rounded p-2 mr-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SupportChat;
