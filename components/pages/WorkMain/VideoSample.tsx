import styles from './VideoSample.module.css'

const VideoSample = ({ details }: { details: WorkDetails }) => {
  return (
    <>
      {!details.sample1 || (
        <div className={styles.video}>
          <video controls controlsList="nodownload">
            <source
              src={details.sample1}
              type="video/mp4"
            />
          </video>
        </div>
      )}
      {!details.sample2 || (
        <div className={styles.video}>
          <video controls controlsList="nodownload">
            <source
              src={details.sample2}
              type="video/mp4"
            />
          </video>
        </div>
      )}
      {!details.sample3 || (
        <div className={styles.video}>
          <video controls controlsList="nodownload">
            <source
              src={details.sample3}
              type="video/mp4"
            />
          </video>
        </div>
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

export default VideoSample
