import Link from 'next/link'
import styles from './ForgotPasswordLink.module.css'

const ForgotPasswordLink = () => {
  return <Link className={styles.content} target="_blank" href="/forgot-password">비밀번호 찾기</Link>
}

export default ForgotPasswordLink
