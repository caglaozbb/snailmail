import { io } from 'socket.io-client';

// Use environment variable if available, otherwise fallback to localhost
const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export const socket = io(URL, {
    autoConnect: false,
    transports: ['websocket'] 
});
