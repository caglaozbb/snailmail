const { Server } = require("socket.io");

const io = new Server(4000, {
  cors: {
    origin: "*", // Tüm kaynaklardan gelen bağlantılara izin ver (test için)
  },
});

console.log("Socket.IO sunucusu 4000 portunda çalışıyor...");

io.on("connection", (socket) => {
  console.log(`Yeni bağlantı: ${socket.id}`);

  // İstemciden gelen mesajları dinle
  socket.on("message", (data) => {
    console.log(`Mesaj alındı (${socket.id}): ${data}`);
    
    // Mesajı gönderen HARİÇ diğer herkese yayınla
    socket.broadcast.emit("message", data);
    
    // Test için: Eğer mesaj "test" ise sunucu otomatik cevap versin
    if (data.toLowerCase() === "test") {
      setTimeout(() => {
        socket.emit("message", "Sunucudan otomatik cevap: Test başarılı!");
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Bağlantı kesildi: ${socket.id}`);
  });
});

