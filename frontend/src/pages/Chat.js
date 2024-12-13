import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { connectWebSocket, sendMessage, closeWebSocket } from '../services/websocketService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    connectWebSocket(user.token);

    return () => {
      closeWebSocket();
    };
  }, [user.token]);

  useEffect(() => {
    const handleNewMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    window.addEventListener('message', handleNewMessage);

    return () => {
      window.removeEventListener('message', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage({ type: 'chat', message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto mb-4 p-4 border rounded">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === user.username ? 'text-right' : ''}`}>
                <span className="font-bold">{msg.sender}: </span>
                <span>{msg.content}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;

