import { useState, useEffect } from "react";
import TitleBar from "./components/TitleBar";
import FriendsList from "./components/FriendsList";
import ChatWindows from "./components/ChatWindows";
import AvatarPanel from "./components/AvatarPanel";
import Login from "./components/Login";
import { socket } from "./socket";
import './assets/main.css'

function App() {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Socket events
    const onUsersUpdate = (users) => {
      // Filter out self from online users list if needed, 
      // but usually we want to see everyone or handle it in UI.
      // For now, let's keep everyone and filter in display if needed.
      setOnlineUsers(users);
    };

    socket.on('users:update', onUsersUpdate);

    return () => {
      socket.off('users:update', onUsersUpdate);
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    
    // Connect and send user data
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit('user:join', userData);
  };

  if (!user) {
    return (
      <div className="app">
        <TitleBar />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  // Filter out current user from friends list to avoid showing self in friends list
  const friendsList = onlineUsers.filter(u => u.id !== socket.id);

  return (
    <>
      <div className="app">
        <TitleBar />

        <div className="main">
          <FriendsList user={user} onlineUsers={friendsList} />
          <ChatWindows />
          <AvatarPanel user={user} />
        </div>
      </div>
    </>
  )
}

export default App
