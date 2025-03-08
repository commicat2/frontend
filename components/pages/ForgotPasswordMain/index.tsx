'use client'

import { useState } from 'react'
import AccountLogo from 'components/common/AccountLogo'
import ForgotPasswordForm from './ForgotPasswordForm'
import SendPasswordResetDone from './SendPasswordResetDone'
import styles from './index.module.css'

const ForgotPasswordMain = () => {
  const [email, setEmail] = useState('')

  return (
    <main className={styles.container}>
      <AccountLogo />
      {!email ? <ForgotPasswordForm setEmail={setEmail} /> : <SendPasswordResetDone email={email} />}
    </main>
  )
}

export default ForgotPasswordMain
