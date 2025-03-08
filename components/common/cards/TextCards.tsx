import Link from 'next/link'
import styles from './WorkCards.module.css'

const TextCards = ({ works }: { works: WorkThumbnail[] }) => {
  return (
    <div className={styles.container}>
      {works.map((work) => {
        return (
          <div key={work.id} className={styles.card}>
            <Link className={styles.thumbnail} href={`/work/${work.id}`}>
              <p className={styles.textThumbnail}>{work.thumbnail_playable || ''}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default TextCards
