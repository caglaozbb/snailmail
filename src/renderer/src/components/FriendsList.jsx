import styles from './FriendsList.module.css';
import bubiAvatar from '../assets/avatars/bubi.png';
import ribbitAvatar from '../assets/avatars/ribbit.png';
import tomatoAvatar from '../assets/avatars/tomato.png';
import mochiAvatar from '../assets/avatars/mochi.png';
import froggoAvatar from '../assets/avatars/froggo.png';
import hoppuAvatar from '../assets/avatars/hoppu.png';

export default function FriendsList() {
    const friends = [
        { id: 1, name: "ribbit", online: true, avatar: ribbitAvatar },
        { id: 2, name: "tomato", online: true, avatar: tomatoAvatar },
        { id: 3, name: "hoppu", online: false, avatar: hoppuAvatar },
        { id: 4, name: "mochi", online: false, avatar: mochiAvatar },
        { id: 5, name: "froggo", online: false, avatar: froggoAvatar },
      ];
    
    return (
            <div className={styles.container}>
              {/* USER PROFILE */}
              <div className={styles.profileSection}>
                <div className={styles.header}>
                    <img
                    src={bubiAvatar}
                    alt="user avatar"
                    className={styles.avatar}
                    />
            
                    <div className={styles.userInfo}>
                        <h1 className={styles.username}>BUBI</h1>
                        <div className={styles.statusContainer}>
                            <span className={styles.statusIcon} />
                            <span className={styles.statusText}>online</span>
                        </div>
                    </div>
                </div>
                
                <p className={styles.bio}>
                    little little cute <br />
                    funny biography &lt;3
                </p>
              </div>
        
              {/* FRIENDS SECTION */}
              <div className={styles.friendsSection}>
                <h2 className={styles.title}>
                  Friends ({friends.filter(friend => friend.online).length}/{ friends.length})
                </h2>
        
                {friends.map((friend) => (
                  <div key={friend.id} className={styles.friend}>
                    <img
                      src={friend.avatar}
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