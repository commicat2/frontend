import styles from './FaqCard.module.css'

const FaqCard = ({ children }: Children) => {
  return (
    <div className={styles.content}>{children}</div>
  )
}

export default FaqCard
