'use client'

import { useState } from 'react'
import SignIn from 'components/common/account/SignIn'
import SignUp from 'components/common/account/SignUp'
import SocialSignIn from 'components/common/account/SocialSignIn'
import styles from './SignInMain.module.css'

const SignInMain = () => {
  const [showSignIn, setShowSignIn] = useState(true)
  const [isFirstSignIn, setIsFirstSignIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <main className={styles.container}>
      {showSignIn
        ? <SignIn isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} setShowSignIn={setShowSignIn} />
        : <SignUp email={email} setEmail={setEmail} isFirstSignIn={isFirstSignIn} setShowSignIn={setShowSignIn} />}
      {!isFirstSignIn && !email && <SocialSignIn setIsFirstSignIn={setIsFirstSignIn} />}
    </main>
  )
}

export default SignInMain
