const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: "*", // Tüm kaynaklardan gelen bağlantılara izin ver
  },
});

console.log("Socket.IO sunucusu 4000 portunda çalışıyor...");

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`Yeni bağlantı: ${socket.id}`);

  // Kullanıcı giriş yaptığında
  socket.on("user:join", (userData) => {
    console.log(`Kullanıcı katıldı: ${userData.name} (${socket.id})`);
    
    // Kullanıcıyı listeye ekle
    connectedUsers[socket.id] = {
      ...userData,
      id: socket.id,
      online: true
    };
    
    // Tüm kullanıcılara güncel listeyi gönder
    io.emit("users:update", Object.values(connectedUsers));
  });

  // İstemciden gelen mesajları dinle
  socket.on("message", (data) => {
    console.log(`Mesaj alındı (${socket.id}): ${data}`);
    socket.broadcast.emit("message", data);
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
