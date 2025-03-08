'use client'

import { useState } from 'react'
import AccountLogo from 'components/common/AccountLogo'
import UpdatePasswordForm from 'components/pages/UpdatePasswordForm'
import styles from './UpdatePasswordMain.module.css'

const UpdatePasswordMain = ({ success, uidb64, token }: UidbSlugs & Success) => {
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false)

  const renderContent = () => {
    if (!success) return <p className={styles.content}>유효하지 않거나 만료된 링크입니다.</p>
    if (isPasswordUpdated) return <p className={styles.content}>비밀번호 변경이 완료되었습니다.</p>
    return <UpdatePasswordForm uidb64={uidb64} token={token} setIsPasswordUpdated={setIsPasswordUpdated} />
  }

  return (
    <main className={styles.container}>
      <AccountLogo />
      {renderContent()}
    </main>
  )
}

export default UpdatePasswordMain
