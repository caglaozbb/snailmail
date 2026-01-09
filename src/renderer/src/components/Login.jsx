import { useState } from 'react';
import styles from './Login.module.css';
import { LOGIN_AVATARS } from '../utils/avatars';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // Pick a random avatar ID
      const randomAvatarId = LOGIN_AVATARS[Math.floor(Math.random() * LOGIN_AVATARS.length)];
      onLogin({ name, bio, avatarId: randomAvatarId });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Welcome to SnailMail</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell me something funny"
          />
        </div>
        <button type="submit" className={styles.loginButton}>Enter</button>
      </form>
    </div>
  );
}
