import Image from 'next/image'
import Link from 'next/link'
import Badge from 'components/common/Badge'
import styles from './WorkCards.module.css'

const OtherCards = ({ works }: { works: WorkThumbnail[] }) => {
  return (
    <div className={styles.container}>
      {works.map((work) => {
        switch (work.sample_genre) {
          case 1:
            return (
              <div key={work.id} className={styles.card}>
                <Link className={styles.thumbnail} href={`/work/${work.id}`}>
                  <Image
                    fill
                    sizes="100%"
                    priority
                    src={work.thumbnail || '/default_profile_pic.jpg'}
                    alt="Thumbnail"
                  />
                </Link>
              </div>
            )
          case 2:
            return (
              <div key={work.id} className={styles.card}>
                <Link className={styles.thumbnail} href={`/work/${work.id}`}>
                  <Image
                    fill
                    sizes="100%"
                    priority
                    src={work.thumbnail || '/default_profile_pic.jpg'}
                    alt="Thumbnail"
                  />
                </Link>
                <audio controls controlsList="nodownload" className={styles.audio}>
                  <source type="audio/mp3" src={work.thumbnail_playable || ''} />
                </audio>
              </div>
            )
          case 3:
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
          case 4:
            return (
              <div key={work.id} className={styles.card}>
                <Link className={styles.thumbnail} href={`/work/${work.id}`}>
                  <p className={styles.textThumbnail}>{work.thumbnail_playable || ''}</p>
                </Link>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default OtherCards
