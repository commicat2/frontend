import styles from './MainContainerSubHeader.module.css'

const MainContainerSubHeader = ({ children }: Children) => {
  return <div className={styles.header}>{children}</div>
}

export default MainContainerSubHeader
