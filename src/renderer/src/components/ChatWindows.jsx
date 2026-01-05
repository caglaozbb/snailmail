import { useState } from 'react';
import styles from './ChatWindows.module.css';

export default function ChatWindows() {
    const [messages, setMessages] = useState([
        { text: "Hello! How are you?", sender: "other" }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: "me" }]);
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
