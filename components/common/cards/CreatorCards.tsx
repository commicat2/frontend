import Image from 'next/image'
import Link from 'next/link'
import Badge from 'components/common/Badge'
import styles from './CreatorCards.module.css'

const CreatorCards = ({ creators }: { creators: CreatorCard[] }) => {
  return (
    <div className={styles.container}>
      {creators.map((creator) => {
        return (
          <Link className={styles.link} key={creator.pk} href={`/@${creator.english_nickname}`} prefetch={false}>
            <div className={styles.card}>
              <div className={styles.badgeContainer}>
                {creator.creator_profile?.seek_request ? <Badge option="seekRequest" /> : <Badge option="notSeekRequest" />}
                {!creator.creator_profile?.allow_image || <Badge option="image" />}
                {!creator.creator_profile?.allow_audio || <Badge option="audio" />}
                {!creator.creator_profile?.allow_video || <Badge option="video" />}
                {!creator.creator_profile?.allow_text || <Badge option="text" />}
                {!creator.creator_profile?.allow_other || <Badge option="other" />}
              </div>
              <div className={styles.profileBg}>
                <Image
                  fill
                  sizes="100%"
                  priority
                  src={creator.profile_bg || '/default_profile_bg.jpg'}
                  alt="Profile Background"
                />
              </div>
              <div className={styles.profilePic}>
                <Image
                  fill
                  sizes="100%"
                  priority
                  src={creator.profile_pic || '/default_profile_pic.jpg'}
                  alt="Profile"
                />
              </div>
              <div className={styles.texts}>
                <p className={styles.nickname}>{creator.nickname}</p>
                <p className={styles.intro}>{creator.intro}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CreatorCards
