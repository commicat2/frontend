import styles from './AddYoutubeModal.module.css'

const AddYoutubeModal = ({ closeModal, returnResult }: ModalComponentProps) => {
  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    returnResult(e.target.content?.value || '')
    closeModal()
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>유튜브 링크 추가</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.contentInput} id="content" type="text" />
        <button className={styles.submitButton} type="submit">확인</button>
      </form>
    </div>
  )
}

export default AddYoutubeModal
