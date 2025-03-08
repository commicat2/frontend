'use client'

import { useState } from 'react'
import { useSendPasswordReset } from 'lib/api/queryHooks'
import { isValidEmail } from 'lib/utils/validators'
import IsLoading from 'components/common/IsLoading'
import AccountInput from 'components/common/AccountInput'
import Button from 'components/common/Button'
import styles from './ForgotPasswordForm.module.css'

const ForgotPasswordForm = ({ setEmail }: SetEmail) => {
  const { mutate, isPending } = useSendPasswordReset()
  const [validateError, setValidateError] = useState('')

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    const email = e.target.email?.value || ''
    if (!isValidEmail(email)) setValidateError('이메일을 확인해주세요.')
    else {
      mutate({ email }, {
        onError: (error) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
        onSuccess: () => { setEmail(email) },
      })
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isPending || <IsLoading />}
      <p className={styles.error}>{validateError}</p>
      <AccountInput value="email" type="email" />
      <Button type="submit" disabled={!!isPending}>비밀번호 변경 요청하기</Button>
    </form>
  )
}

export default ForgotPasswordForm
