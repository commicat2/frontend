import styles from './CommonCheckboxInput.module.css'

const CommonCheckboxInput = ({
  label,
  name,
  comment = '',
  ...props
}: CommonInputProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        type="checkbox"
        id={name}
        name={name}
        {...props}
      />
      <span className={styles.comment}>{comment}</span>
    </div>
  )
}

export default CommonCheckboxInput
