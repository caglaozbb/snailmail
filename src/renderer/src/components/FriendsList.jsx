import styles from './FriendsList.module.css';
import { getAvatar } from '../utils/avatars';

export default function FriendsList({ user, onlineUsers = [] }) {
    
    return (
            <div className={styles.container}>
              {/* USER PROFILE */}
              <div className={styles.profileSection}>
                <div className={styles.header}>
                    <img
                    src={user ? getAvatar(user.avatarId) : getAvatar('bubi')}
                    alt="user avatar"
                    className={styles.avatar}
                    />
            
                    <div className={styles.userInfo}>
                        <h1 className={styles.username}>{user ? user.name : "GUEST"}</h1>
                        <div className={styles.statusContainer}>
                            <span className={styles.statusIcon} />
                            <span className={styles.statusText}>online</span>
                        </div>
                    </div>
                </div>
                
                <p className={styles.bio}>
                    {user ? user.bio : "little little cute funny biography <3"}
                </p>
              </div>
        
              {/* FRIENDS SECTION */}
              <div className={styles.friendsSection}>
                <h2 className={styles.title}>
                  Friends ({onlineUsers.length})
                </h2>
        
                {onlineUsers.map((friend) => (
                  <div key={friend.id} className={styles.friend}>
                    <img
                      src={getAvatar(friend.avatarId)}
                      alt={friend.name}
                      className={styles.friendAvatar}
                    />
        
                    <span className={styles.friendName}>
                      {friend.name}
                    </span>
        
                    <span
                      className={
                        friend.online
                          ? styles.online
                          : styles.offline
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
        )
}
