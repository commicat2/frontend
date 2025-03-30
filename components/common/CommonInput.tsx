import styles from './CommonInput.module.css'

const CommonInput = ({
  className = '',
  label,
  name,
  comment = '',
  ...props
}: ClassName & CommonInputProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.label} ${className}`}>{label}</div>
      <div className={styles.inputContainer}>
        <input className={styles.input} id={name} name={name} {...props} />
      </div>
      <span className={styles.comment}>{comment}</span>
    </div>
  )
}

export default CommonInput
