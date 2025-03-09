import Image from 'next/image'
import styles from './NoticeA.module.css'

const NoticeA = () => {
  return (
    <main className={styles.container}>
      <div className={styles.image}>
        <Image fill sizes="100%" priority src="/notice-a.png" alt="Commicat Notice A" />
      </div>
    </main>
  )
}

export default NoticeA
