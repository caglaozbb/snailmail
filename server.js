const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

const io = new Server(PORT, {
  cors: {
    origin: "*", 
  },
});

console.log(`Socket.IO server is running on port ${PORT}`);

const AVAILABLE_AVATARS = ['blue', 'green', 'orange', 'purple', 'red', 'white'];

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("user:join", (userData) => {
    console.log(`User joined: ${userData.name} (${socket.id})`);
    
    const usedAvatars = Object.values(connectedUsers).map(u => u.avatarId);
    
    let available = AVAILABLE_AVATARS.filter(a => !usedAvatars.includes(a));
    
    if (available.length === 0) {
        available = AVAILABLE_AVATARS;
    }
    
    const assignedAvatarId = available[Math.floor(Math.random() * available.length)];
    
    const fullUserData = {
        ...userData,
        id: socket.id,
        avatarId: assignedAvatarId,
        online: true
    };

    connectedUsers[socket.id] = fullUserData;
    
    socket.emit("login:success", fullUserData);
    
    io.emit("users:update", Object.values(connectedUsers));
  });

  socket.on("private:message", ({ to, content }) => {
    console.log(`Private message (${socket.id} -> ${to}): ${content}`);
    
    io.to(to).emit("private:message", {
      from: socket.id,
      content: content
    });
  });

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
    
    if (connectedUsers[socket.id]) {
      delete connectedUsers[socket.id];
      io.emit("users:update", Object.values(connectedUsers));
    }
  });
});
