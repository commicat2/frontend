import styles from './SignInHeader.module.css'

const SignInHeader = ({ setShowSignIn }: { setShowSignIn: SetState<boolean> }) => {
  return (
    <div className={styles.container}>
      {'회원이 아니신가요? '}
      <button className={styles.link} type="button" onClick={() => { setShowSignIn(false) }}>
        회원 가입하기
      </button>
    </div>
  )
}

export default SignInHeader
