import { useState, useEffect } from 'react';
import styles from './ChatWindows.module.css';
import { socket } from '../socket';

export default function ChatWindows() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        console.log("Sohbet bileşeni yüklendi, sokete bağlanılıyor...");
        socket.connect();

        function onConnect() {
            console.log("✅ Sunucuya bağlanıldı! Socket ID:", socket.id);
        }

        function onDisconnect() {
            console.log("❌ Sunucu bağlantısı koptu.");
        }

        function onConnectError(err) {
            console.error("⚠️ Bağlantı hatası:", err.message);
        }

        function onMessage(value) {
            console.log("📩 Yeni mesaj alındı:", value);
            setMessages(prev => [...prev, { text: value, sender: "other" }]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('connect_error', onConnectError);
        socket.on('message', onMessage);

        return () => {
            console.log("Bileşeni kapatılıyor, bağlantı kesiliyor...");
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('connect_error', onConnectError);
            socket.off('message', onMessage);
            socket.disconnect();
        };
    }, []);

    const handleSend = () => {
        if (inputValue.trim()) {
            console.log("📤 Mesaj gönderiliyor:", inputValue);
            const newMessage = { text: inputValue, sender: "me" };
            setMessages(prev => [...prev, newMessage]); 
            
            socket.emit('message', inputValue);
            
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>To: ribbit</div>
                <div className={styles.chatBody}>
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`${styles.message} ${msg.sender === 'me' ? styles.sent : styles.received}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.messageInputContainer}>
                <textarea 
                    className={styles.messageInput} 
                    placeholder="Type here..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className={styles.sendButton} onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
