import styles from './CommonModal.module.css'

const CommonModal = ({ title, content }: Partial<ModalComponentProps>) => {
  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title || ''}</h2>
      </div>
      <div className={styles.modalContent}>{content || ''}</div>
    </div>
  )
}

export default CommonModal
