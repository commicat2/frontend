'use client'

import { useRouter } from 'next/navigation'
import {
  useCallback, useLayoutEffect, useRef, useState,
} from 'react'
import { checkAuthentication } from 'lib/api/queryFunctions'
import { useDisableAccount, useDeleteAccount } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import Nav from 'components/common/Nav'
import Footer from 'components/common/Footer'
import Modal from 'components/common/Modal'
import styles from './DisableAccountMain.module.css'

const DisableAccountMain = () => {
  const { mutate: disableMutate, isPending: isDisablePending } = useDisableAccount()
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteAccount()
  const router = useRouter()
  const option = useRef('')
  const authProvider = useRef('email')
  const [isPasswordCheckModalOpen, setIsPasswordCheckModalOpen] = useState(false)
  const [validateError, setValidateError] = useState('')
  const [completeMessage, setCompleteMessage] = useState('')
  const [rerenderNav, setRerenderNav] = useState(false)

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem('jas')
    localStorage.removeItem('ecs')
    setRerenderNav(true)
  }, [])

  const loginCheck = useCallback(async () => {
    try {
      const { success, auth_provider } = await checkAuthentication()
      if (!success) router.push('/sign-in')
      authProvider.current = auth_provider
    } catch { router.push('/sign-in') }
  }, [router])

  useLayoutEffect(() => {
    if (!localStorage.getItem('jas')) router.push('/sign-in')
    else loginCheck()
  }, [router, loginCheck])

  const handleMutateError = (error: MessageError) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') }
  const handleDisableSuccess = () => { setCompleteMessage('계정 비활성화가 완료되었습니다. 비활성화 계정은 로그인시 자동으로 활성화됩니다.'); clearLocalStorage() }
  const handleDeleteSuccess = () => { setCompleteMessage('회원탈퇴가 완료되었습니다.'); clearLocalStorage() }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => { option.current = e.target.value }

  const handleSubmit = () => {
    switch (option.current) {
      case '비활성화':
        disableMutate(undefined, { onError: handleMutateError, onSuccess: handleDisableSuccess })
        break
      case '회원탈퇴':
        deleteMutate(undefined, { onError: handleMutateError, onSuccess: handleDeleteSuccess })
        break
      default:
        setValidateError('다시 입력해주세요.')
        break
    }
  }

  const openModal = (e: CommonFormEvent) => {
    e.preventDefault()
    const { value } = e.target.option
    if (value !== '비활성화' && value !== '회원탈퇴') { setValidateError('다시 입력해주세요.'); return }
    e.target.option.blur()
    setValidateError('')
    if (authProvider.current === 'email') setIsPasswordCheckModalOpen(true)
    else handleSubmit()
  }

  return (
    <>
      <Nav rerenderNav={rerenderNav} setRerenderNav={setRerenderNav} />
      <main className={styles.container}>
        {(!isDisablePending && !isDeletePending) || <IsLoading />}
        {completeMessage ? <p className={styles.complete}>{completeMessage}</p> : (
          <form className={styles.form} onSubmit={openModal}>
            <p>&#39;비활성화&#39; 또는 &#39;회원탈퇴&#39;를 입력해주세요.</p>
            <input className={styles.input} id="option" aria-label="option" onBlur={handleBlur} />
            <div className={styles.bottom}>
              <p className={styles.error}>{validateError}</p>
              <button className={styles.button} type="submit">확인</button>
            </div>
          </form>
        )}
      </main>
      {!isPasswordCheckModalOpen || <Modal option="passwordCheck" closeModal={() => { setIsPasswordCheckModalOpen(false) }} returnResult={handleSubmit} />}
      <Footer />
    </>
  )
}

export default DisableAccountMain
