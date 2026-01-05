import snailmailLogo from '../assets/snail.png';
import minimizeIcon from '../assets/minimize.png';
import closeIcon from '../assets/close.png';
import styles from './TitleBar.module.css';

export default function TitleBar() {
    const handleMinimize = () => {
        window.api.minimize();
    };

    const handleClose = () => {
        window.api.close();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leftSection}>
                    <div className={styles.logo}>
                        <img src={snailmailLogo} alt="SnailMail" />
                    </div>
                    <div className={styles.title}>
                        <h1>SNAILMAIL</h1>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleMinimize}>
                        <img className={styles.iconMinimize} src={minimizeIcon} alt="Minimize" />
                    </button>
                    <button className={styles.button} onClick={handleClose}>
                        <img className={styles.iconClose} src={closeIcon} alt="Close" />
                    </button>
                </div>
            </div>
        </div>
    );
}
