import styles from './RejectRequestModal.module.css'

const RejectRequestModal = ({ closeModal, returnResult }: ModalComponentProps) => {
  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    closeModal()
    returnResult(e.target.content?.value)
  }
  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>요청 거절</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.contentInput}
          type="text"
          id="content"
          name="content"
          placeholder="거절 사유(선택 사항)"
        />
        <button className={styles.submitButton} type="submit">확인</button>
      </form>
    </div>
  )
}

export default RejectRequestModal
