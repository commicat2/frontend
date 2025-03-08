import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.firstItem}>
          <div className={styles.smallText}>
            <p>Commicat은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.</p>
            <p>작품, 거래에 관한 의무와 책임은 판매자에게 있습니다.</p>
          </div>
          <p>사업자등록번호: 495-06-02979</p>
          <p>통신판매업신고번호: 제2024-경기하남-2046호</p>
          <p>대표자(개인정보관리책임자): 박지석</p>
          <p>Email: commicat.sup@gmail.com</p>
          <p>소재지: 경기도 하남시 감일백제로 65, 1207동 16층</p>
          <p>Hosting by AWS</p>
          <p>Copyright © 2024 Commicat Corp. All Right Reserved.</p>
        </div>
        <div className={styles.secondItem}>
          <Link target="_blank" href="/terms" prefetch={false}>이용약관</Link>
          <Link target="_blank" href="/privacy" prefetch={false}>개인정보처리방침</Link>
          <Link target="_blank" href="/faq" prefetch={false}>FAQ</Link>
        </div>
        <div className={styles.thirdItem}>
          <a target="_blank" href="https://x.com/commicat_sup" rel="noopener noreferrer">
            <div className={styles.icon}><Image fill sizes="100%" priority src="/icon-x.png" alt="X" /></div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
