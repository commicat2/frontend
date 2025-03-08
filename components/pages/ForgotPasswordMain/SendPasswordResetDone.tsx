import styles from './SendPasswordResetDone.module.css'

const SendPasswordResetDone = ({ email }: Email) => {
  return <div className={styles.content}>{`${email}으로 전송된 링크를 통해\n\n비밀번호 변경을 완료해주세요.`}</div>
}

export default SendPasswordResetDone
