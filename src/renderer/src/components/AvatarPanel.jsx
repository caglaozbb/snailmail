import styles from './AvatarPanel.module.css';
import { getAvatar } from '../utils/avatars';

export default function AvatarPanel({ user }) {
    return (
        <div className={styles.container}>
            <div className={styles.topSection}>
                <img src={getAvatar('mochi')} alt="user avatar" className={styles.avatar} />
            </div>
            <div className={styles.bottomSection}>
                {user ? (
                    <>
                        <img src={getAvatar(user.avatarId)} alt="user avatar" className={styles.avatar} />
                    </>
                ) : (
                    <img src={getAvatar('ribbitChat')} alt="user avatar" className={styles.avatar} />
                )}
            </div>
        </div>
    )
}
