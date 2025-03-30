import Image from 'next/image'
import Link from 'next/link'
import NavLogo from './Nav/NavLogo'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.content}>
        <div className={styles.firstRow}>
          <NavLogo />
          <div className={styles.secondItem}>
            <Link target="_blank" href="/terms" prefetch={false}>이용약관</Link>
            <span>|</span>
            <Link target="_blank" href="/privacy" prefetch={false}>개인정보처리방침</Link>
            <span>|</span>
            <Link target="_blank" href="/faq" prefetch={false}>FAQ</Link>
          </div>
          <div className={styles.thirdItem}>
            <a target="_blank" href="https://x.com/commicat_sup" rel="noopener noreferrer">
              <div className={styles.icon}><Image fill sizes="100%" priority src="/icon-x.png" alt="X" /></div>
            </a>
          </div>
        </div>
        <div className={styles.secondRow}>
          <div className={styles.row}>
            <p>사업자등록번호: 495-06-02979</p>
            <span>|</span>
            <p>통신판매업신고번호: 제2024-경기하남-2046호</p>
          </div>
          <div className={styles.row}>
            <p>대표자(개인정보관리책임자): 박지석</p>
            <span>|</span>
            <p>Email: commicat.sup@gmail.com</p>
          </div>
          <div className={styles.row}>
            <p>소재지: 경기도 하남시 감일백제로 65, 1207동 16층</p>
            <span>|</span>
            <p>Hosting by AWS</p>
          </div>
          <div className={`${styles.row} ${styles.copyright}`}>
            <p>Copyright © 2024 Commicat Corp. All Right Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
