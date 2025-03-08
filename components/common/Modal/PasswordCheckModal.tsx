'use client'

import { useState } from 'react'
import { useCheckPassword } from 'lib/api/queryHooks'
import { isValidPassword } from 'lib/utils/validators'
import IsLoading from 'components/common/IsLoading'
import styles from './PasswordCheckModal.module.css'

const PasswordCheckModal = ({ closeModal, returnResult }: ModalComponentProps) => {
  const { mutate, isPending } = useCheckPassword()
  const [validateError, setValidateError] = useState('')

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    const password = e.target.password?.value || ''
    if (!password || !isValidPassword(password)) { setValidateError('비밀번호를 확인해주세요.'); return }
    mutate({ password }, {
      onError: () => { setValidateError('비밀번호를 확인해주세요.') },
      onSuccess: () => { returnResult(); closeModal() },
    })
  }

  return (
    <div className={styles.container}>
      {!isPending || <IsLoading />}
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>비밀번호 확인</h2>
      </div>
      <p className={styles.error}>{validateError}</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input hidden id="username" aria-label="username" type="text" autoComplete="username" />
        <input
          className={styles.passwordInput}
          id="password"
          aria-label="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="off"
        />
        <button className={styles.submitButton} type="submit">확인</button>
      </form>
    </div>
  )
}

export default PasswordCheckModal
