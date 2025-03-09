import Link from 'next/link'
import styles from './HomePageHeader.module.css'

const HomePageHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <p className={styles.headerText}>공지사항</p>
        <Link className={styles.link} href="/notice/1">
          커미캣(Commicat) 소개
        </Link>
        <Link className={styles.link} href="/notice/2">
          크리에이터 이용 가이드
        </Link>
        <Link className={styles.link} href="/notice/3">
          클라이언트 이용 가이드
        </Link>
        <Link className={styles.link} href="/notice/4">
          파트너 크리에이터 이벤트 (~09.09)
        </Link>
      </div>
    </header>
  )
}

export default HomePageHeader
