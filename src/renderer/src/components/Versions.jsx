import { useState } from 'react'
import styles from './Versions.module.css'

function Versions() {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className={styles.versions}>
      <li className={styles.electron}>Electron v{versions.electron}</li>
      <li className={styles.chrome}>Chromium v{versions.chrome}</li>
      <li className={styles.node}>Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
