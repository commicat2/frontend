import styles from './MainContainerButton.module.css'

const MainContainerButton = ({ selected = false, children, ...props }: ButtonProps & Children & { selected?: boolean }) => {
  return (
    <button
      className={`${selected ? styles.selected : styles.notSelected} ${styles.button}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}

export default MainContainerButton
