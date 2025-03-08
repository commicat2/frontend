import styles from './AudioSample.module.css'

const AudioSample = ({ details }: { details: WorkDetails }) => {
  return (
    <>
      {!details.sample1 || (
        <audio controls controlsList="nodownload" className={styles.audio}>
          <source
            src={details.sample1}
            type="audio/mp3"
          />
        </audio>
      )}
      {!details.sample2 || (
        <audio controls controlsList="nodownload" className={styles.audio}>
          <source
            src={details.sample2}
            type="audio/mp3"
          />
        </audio>
      )}
      {!details.sample3 || (
        <audio controls controlsList="nodownload" className={styles.audio}>
          <source
            src={details.sample3}
            type="audio/mp3"
          />
        </audio>
      )}
      {!details.text_sample || (
        <div className={styles.comment}>
          <p className={styles.commentHeader}>크리에이터 코멘트</p>
          <p>{details.text_sample}</p>
        </div>
      )}
    </>
  )
}

export default AudioSample
