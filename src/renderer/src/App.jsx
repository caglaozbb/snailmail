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
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({}); // { [userId]: [{ text, sender: 'me'|'other' }] }

  useEffect(() => {
    // Socket events
    const onUsersUpdate = (users) => {
      setOnlineUsers(users);
    };

    const onLoginSuccess = (userData) => {
        setUser(userData);
    };

    const onPrivateMessage = ({ from, content }) => {
      setMessages(prev => {
        const otherUserId = from;
        const currentMessages = prev[otherUserId] || [];
        return {
          ...prev,
          [otherUserId]: [...currentMessages, { text: content, sender: 'other' }]
        };
      });
      // Optional: Auto-select friend if no chat is active?
    };

    socket.on('users:update', onUsersUpdate);
    socket.on('login:success', onLoginSuccess);
    socket.on('private:message', onPrivateMessage);

    return () => {
      socket.off('users:update', onUsersUpdate);
      socket.off('login:success', onLoginSuccess);
      socket.off('private:message', onPrivateMessage);
    };
  }, []);

  const handleLogin = (userData) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit('user:join', userData);
  };

  const handleSendMessage = (toId, content) => {
    if (!content.trim()) return;

    setMessages(prev => {
      const currentMessages = prev[toId] || [];
      return {
        ...prev,
        [toId]: [...currentMessages, { text: content, sender: 'me' }]
      };
    });

    socket.emit('private:message', { to: toId, content });
  };

  if (!user) {
    return (
      <div className="app">
        <TitleBar />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  const friendsList = onlineUsers.filter(u => u.id !== socket.id);

  return (
    <>
      <div className="app">
        <TitleBar />

        <div className="main">
          <FriendsList 
            user={user} 
            onlineUsers={friendsList} 
            selectedFriend={selectedFriend}
            onSelectFriend={setSelectedFriend}
          />
          <ChatWindows 
            selectedFriend={selectedFriend}
            messages={selectedFriend ? (messages[selectedFriend.id] || []) : []}
            onSendMessage={(content) => handleSendMessage(selectedFriend.id, content)}
          />
          <AvatarPanel user={user} selectedFriend={selectedFriend} />
        </div>
      </div>
    </>
  )
}

export default App
