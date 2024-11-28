import io from 'socket.io-client';

// Connect to chat server
const socket = io('http://localhost:3000');

export default socket;