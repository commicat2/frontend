import styles from './MainContainer.module.css'

const MainContainer = ({ className = '', children }: ClassName & Children) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${className}`}>{children}</div>
    </div>
  )
}

export default MainContainer
