import Link from 'next/link'
import Badge from 'components/common/Badge'
import styles from './WorkCards.module.css'

const VideoCards = ({ works }: { works: WorkThumbnail[] }) => {
  return (
    <div className={styles.container}>
      {works.map((work) => {
        return (
          <div key={work.id} className={styles.card}>
            <video controls controlsList="nodownload" className={styles.video}>
              <source type="video/mp4" src={work.thumbnail_playable || ''} />
            </video>
            <Link className={styles.link} href={`/work/${work.id}`}>
              <Badge option="detail" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default VideoCards
