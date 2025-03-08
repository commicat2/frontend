'use client'

import { useEffect, useState } from 'react'
import { sendEmailVerification } from 'lib/api/queryFunctions'
import Button from 'components/common/Button'
import styles from './SignUpDone.module.css'

const SignUpDone = ({ email, setEmail, setShowSignIn }: Email & SetEmail & { setShowSignIn: SetState<boolean> }) => {
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    const handleSendEmailVerification = async () => { await sendEmailVerification({ email }); setIsSent(true) }
    if (email && !isSent) handleSendEmailVerification()
  }, [email, isSent])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>안녕하세요! 회원가입을 축하드립니다.</p>
        <p>{`${email}로 전송된 링크를 통해 이메일 인증을 완료해주세요.`}</p>
      </div>
      <Button onClick={() => { setShowSignIn(true); setEmail(''); setIsSent(false) }}>로그인하러 가기</Button>
    </div>
  )
}

export default SignUpDone
