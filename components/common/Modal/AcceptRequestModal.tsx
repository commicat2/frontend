import styles from './AcceptRequestModal.module.css'

const AcceptRequestModal = ({ content, closeModal, returnResult }: ModalComponentProps) => {
  const handleClick = () => {
    closeModal()
    returnResult()
  }
  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>요청 승인</h2>
      </div>
      <div className={styles.modalContent}>{content}</div>
      <button className={styles.button} type="button" onClick={handleClick}>확인</button>
    </div>
  )
}

export default AcceptRequestModal
