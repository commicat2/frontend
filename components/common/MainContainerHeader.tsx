import styles from './MainContainerHeader.module.css'

const MainContainerHeader = ({ children }: Children) => {
  return (
    <>
      <div className={styles.header}>{children}</div>
      <hr />
    </>
  )
}

export default MainContainerHeader
