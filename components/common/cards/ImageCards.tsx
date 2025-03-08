import Image from 'next/image'
import Link from 'next/link'
import styles from './WorkCards.module.css'

const ImageCards = ({ works }: { works: WorkThumbnail[] }) => {
  return (
    <div className={styles.container}>
      {works.map((work) => {
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
      })}
    </div>
  )
}

export default ImageCards
