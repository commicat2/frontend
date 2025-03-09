import styles from './NoticeMainContainer.module.css'

const NoticeMainContainer = ({ children }: Children) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default NoticeMainContainer
