import styles from './MainContainer.module.css'

const MainContainer = ({ children }: Children) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default MainContainer
