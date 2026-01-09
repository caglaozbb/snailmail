import { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './ChatWindows.module.css';

export default function ChatWindows({ selectedFriend, messages = [], onSendMessage }) {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSend = () => {
        if (inputValue.trim() && selectedFriend) {
            onSendMessage(inputValue);
            setInputValue('');
            setShowEmojiPicker(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const onEmojiClick = (emojiObject) => {
        setInputValue(prev => prev + emojiObject.emoji);
    };

    if (!selectedFriend) {
        return (
            <div className={styles.container}>
                <div className={styles.emptyState}>
                    <p>Select a friend to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.chatWindow}>
                <div className={styles.chatHeader}>To: {selectedFriend.name}</div>
                <div className={styles.chatBody}>
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`${styles.message} ${msg.sender === 'me' ? styles.sent : styles.received}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className={styles.messageInputContainer}>
                {showEmojiPicker && (
                    <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
                        <EmojiPicker 
                            onEmojiClick={onEmojiClick} 
                            width={300} 
                            height={400}
                        />
                    </div>
                )}
                <textarea 
                    className={styles.messageInput} 
                    placeholder="Type here..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
                <div className={styles.inputToolbar}>
                    <button 
                        className={styles.emojiButton} 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        title="Add emoji"
                    >
                        😊
                    </button>
                    <button className={styles.sendButton} onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
}
