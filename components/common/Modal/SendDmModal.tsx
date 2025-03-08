import styles from './SendDmModal.module.css'

const SendDmModal = ({
  closeModal,
  returnResult,
}: ModalComponentProps) => {
  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    returnResult(e.target.content?.value || '')
    closeModal()
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>DM 전송</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.contentInput}
          id="content"
          type="text"
          placeholder="첫 메세지"
        />
        <button className={styles.submitButton} type="submit">전송</button>
      </form>
    </div>
  )
}

export default SendDmModal
