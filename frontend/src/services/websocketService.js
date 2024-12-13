let socket = null;

export const connectWebSocket = () => {
  socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  
  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    // TODO: Handle incoming WebSocket messages
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

