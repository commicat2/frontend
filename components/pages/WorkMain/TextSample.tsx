import styles from './TextSample.module.css'

const TextSample = ({ details }: { details: WorkDetails }) => {
  return (
    <div className={styles.container}>
      <p className={styles.sample}>{details.text_sample}</p>
    </div>
  )
}

export default TextSample
