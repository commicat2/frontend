'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRegisterCreator } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import styles from './RegisterCreatorModal.module.css'

const RegisterCreatorModal = ({ userId, closeModal, returnResult }: { userId: number } & ModalComponentProps) => {
  const { mutate, isPending } = useRegisterCreator(userId)
  const [jumin1, setJumin1] = useState('')
  const [jumin2, setJumin2] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [validateError, setValidateError] = useState('')

  const handleJumin1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 6) {
      setJumin1(value)
    }
  }

  const handleJumin2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 7) {
      setJumin2(value)
    }
  }

  const handleFocus = () => { setInputFocused(true) }
  const handleBlur = () => { setInputFocused(false) }
  const renderJumin2 = () => { return inputFocused ? jumin2 : '*'.repeat(jumin2.length) }

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    const dec_name = e.target.dec_name?.value || ''
    const dec_jumin = jumin1 + jumin2
    mutate({ cd: btoa(encodeURIComponent(dec_name)), ci: btoa(encodeURIComponent(dec_jumin)) }, {
      onError: (error) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => {
        setTimeout(() => {
          closeModal()
          returnResult()
        }, 500)
      },
    })
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          {!isPending || <IsLoading />}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>개인실명확인</h2>
          </div>
          <p className={styles.comment}>* 신원 확인을 위해 NICE평가정보(주)의 개인실명확인 서비스를 사용합니다.</p>
          <p className={styles.comment}>* 문제가 생기거나 사업자/외국인으로 등록을 원하시면,</p>
          <p className={styles.comment}>&nbsp;&nbsp;&nbsp;commicat.sup@gmail.com으로 문의해주세요.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="dec_name">
              이름
              <input
                className={styles.nameInput}
                id="dec_name"
                type="text"
                maxLength={6}
                autoComplete="off"
              />
            </label>
            <label htmlFor="dec_jumin">
              주민등록번호
              <div className={styles.juminContainer}>
                <input
                  className={styles.juminInput}
                  id="dec_jumin"
                  type="text"
                  maxLength={6}
                  autoComplete="off"
                  value={jumin1}
                  onChange={handleJumin1}
                />
                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                <input
                  className={styles.juminInput}
                  id="dec_jumin2"
                  type="text"
                  maxLength={7}
                  autoComplete="off"
                  value={renderJumin2()}
                  onChange={handleJumin2}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </label>
            <p className={styles.error}>{validateError}</p>
            <button className={styles.submitButton} type="submit">확인</button>
          </form>
        </div>
        <button className={styles.closeButton} type="button" onClick={closeModal}>
          <Image fill src="/icon-close.svg" alt="Close" />
        </button>
      </div>
    </div>
  )
}

export default RegisterCreatorModal
