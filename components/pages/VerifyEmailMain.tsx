import AccountLogo from 'components/common/AccountLogo'
import styles from './VerifyEmailMain.module.css'

const VerifyEmailMain = ({ success }: Success) => {
  return (
    <main className={styles.container}>
      <AccountLogo />
      <div className={styles.content}>{success ? '이메일 인증이 완료되었습니다.' : '유효하지 않거나 만료된 링크입니다.'}</div>
    </main>
  )
}

export default VerifyEmailMain
