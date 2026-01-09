import styles from './AvatarPanel.module.css';
import { getAvatar, DEFAULT_AVATAR } from '../utils/avatars';

export default function AvatarPanel({ user, selectedFriend }) {
    if (!selectedFriend) return null;

    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <img src={getAvatar(selectedFriend.avatarId)} alt="friend avatar" className={styles.avatar} />
                
                <div className={styles.nameContainer}>
                <span className={`${styles.statusIndicator} ${selectedFriend.online ? '' : styles.statusOffline}`} 
                        title={selectedFriend.online ? "Online" : "Offline"}
                    />
                    <h3 className={styles.userName}>{selectedFriend.name}</h3>
                </div>
                
                {/* <p className={styles.userBio}>{selectedFriend.bio}</p> */}
            </div>
            <div className={styles.bottomSection}>
                {user ? (
                    <>
                        <img src={getAvatar(user.avatarId)} alt="user avatar" className={styles.avatar} />
                    </>
                ) : (
                    <img src={getAvatar(DEFAULT_AVATAR)} alt="user avatar" className={styles.avatar} />
                )}
            </div>
        </div>
    )
}
