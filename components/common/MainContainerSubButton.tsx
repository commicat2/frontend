import styles from './MainContainerSubButton.module.css'

const MainContainerSubButton = ({ selected = false, children, ...props }: ButtonProps & Children & { selected?: boolean }) => {
  return (
    <button className={`${selected ? styles.selected : styles.notSelected} ${styles.button}`} type="button" {...props}>
      {children}
    </button>
  )
}

export default MainContainerSubButton
