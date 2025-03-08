import styles from './SignUpHeader.module.css'

const SignUpHeader = ({ setShowSignIn }: { setShowSignIn: SetState<boolean> }) => {
  return (
    <div className={styles.container}>
      {'이미 회원이신가요? '}
      <button className={styles.link} type="button" onClick={() => { setShowSignIn(true) }}>
        로그인 하기
      </button>
    </div>
  )
}

export default SignUpHeader
