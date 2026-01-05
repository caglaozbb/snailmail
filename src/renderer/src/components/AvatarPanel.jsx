import styles from './AvatarPanel.module.css';
import bubbiChatAvatar from '../assets/avatars/bubbiChat.png';
import ribbitChatAvatar from '../assets/avatars/ribbitChat.png';
export default function AvatarPanel() {
    return (
        <div className={styles.container}>
                <div className={styles.topSection}>
                    <img src={bubbiChatAvatar} alt="user avatar" className={styles.avatar} />
                    {/* <h1>ribbit</h1> */}
                </div>
                <div className={styles.bottomSection}>
                    <img src={ribbitChatAvatar} alt="user avatar" className={styles.avatar} />
                </div>
            </div>
    )
}
