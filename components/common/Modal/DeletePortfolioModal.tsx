import styles from './DeletePortfolioModal.module.css'

const DeletePortfolioModal = ({ closeModal, returnResult }: ModalComponentProps) => {
  const handleClick = () => { closeModal(); returnResult() }

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>삭제하시겠습니까?</div>
      <button className={styles.button} type="button" onClick={handleClick}>확인</button>
    </div>
  )
}

export default DeletePortfolioModal
