const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

const io = new Server(PORT, {
  cors: {
    origin: "*", // Tüm kaynaklardan gelen bağlantılara izin ver
  },
});

console.log(`Socket.IO sunucusu ${PORT} portunda çalışıyor...`);

// Available avatars from client's utils/avatars.js
const AVAILABLE_AVATARS = ['blue', 'green', 'orange', 'purple', 'red', 'white'];

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`Yeni bağlantı: ${socket.id}`);

  // Kullanıcı giriş yaptığında
  socket.on("user:join", (userData) => {
    console.log(`Kullanıcı katılım isteği: ${userData.name} (${socket.id})`);
    
    // Calculate used avatars
    const usedAvatars = Object.values(connectedUsers).map(u => u.avatarId);
    
    // Filter available avatars (not used yet)
    let available = AVAILABLE_AVATARS.filter(a => !usedAvatars.includes(a));
    
    // If all avatars are used, reuse from the full pool
    if (available.length === 0) {
        available = AVAILABLE_AVATARS;
    }
    
    // Pick a random avatar from the available list
    const assignedAvatarId = available[Math.floor(Math.random() * available.length)];
    
    const fullUserData = {
        ...userData,
        id: socket.id,
        avatarId: assignedAvatarId,
        online: true
    };

    // Kullanıcıyı listeye ekle
    connectedUsers[socket.id] = fullUserData;
    
    // Kullanıcıya giriş başarısını ve atanan avatarı bildir
    socket.emit("login:success", fullUserData);
    
    // Tüm kullanıcılara güncel listeyi gönder
    io.emit("users:update", Object.values(connectedUsers));
  });

  // Özel mesaj
  socket.on("private:message", ({ to, content }) => {
    console.log(`Özel mesaj (${socket.id} -> ${to}): ${content}`);
    
    // Alıcıya gönder (gönderen zaten kendi state'ini güncelledi)
    io.to(to).emit("private:message", {
      from: socket.id,
      content: content
    });
  });

  socket.on("disconnect", () => {
    console.log(`Bağlantı kesildi: ${socket.id}`);
    
    // Kullanıcıyı listeden çıkar
    if (connectedUsers[socket.id]) {
      delete connectedUsers[socket.id];
      // Listeyi güncelle
      io.emit("users:update", Object.values(connectedUsers));
    }
  });
});
