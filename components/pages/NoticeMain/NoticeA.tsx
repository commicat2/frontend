import Image from 'next/image'
import styles from './NoticeA.module.css'

const NoticeA = () => {
  return (
    <main className={styles.container}>
      <div className={styles.desktop}>
        <Image fill sizes="100%" priority src="/notice-a.png" alt="Commicat Notice A" />
      </div>
      <div className={styles.mobile}>
        <Image fill sizes="100%" priority src="/notice-a-mobile.png" alt="Commicat Notice A Mobile" />
      </div>
    </main>
  )
}

export default NoticeA
