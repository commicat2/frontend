import { useEffect } from 'react'
import styles from './ConfirmModal.module.css'

const ConfirmModal = ({
  amount, bankAccount, closeModal, returnResult,
}: {
  amount: string, bankAccount: string[], closeModal: () => void, returnResult: () => void
}) => {
  const name = bankAccount[0] || ''
  const bankName = bankAccount[1] || ''
  const number = bankAccount[2] || ''

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return
      if (e.target.classList?.contains(styles.modalOverlay)) closeModal()
    }

    const handleEscKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [closeModal])

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    returnResult()
    closeModal()
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>작업 요청 계좌</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.bankInfos}>
            <p className={styles.bankInfoHeader}>* 입금자 확인 및 환불 처리 시 이용됩니다.</p>
            <p className={styles.bankInfo}>
              <span className={styles.bankInfoLabel}>{'입금자명: '}</span>
              {name}
            </p>
            <p className={styles.bankInfo}>
              <span className={styles.bankInfoLabel}>{'은행 이름: '}</span>
              {bankName}
            </p>
            <p className={styles.bankInfo}>
              <span className={styles.bankInfoLabel}>{'계좌 번호: '}</span>
              {number}
            </p>
            <p className={styles.bankInfo}>
              <span className={styles.bankInfoLabel}>{'요청 금액: '}</span>
              {amount}
            </p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} type="submit">
              확인
            </button>
            <button className={styles.button} type="button" onClick={closeModal}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmModal
