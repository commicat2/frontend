import Image from 'next/image'
import Badge from 'components/common/Badge'
import styles from './ProfileHeader.module.css'

const ProfileHeader = ({ profile, creatorProfile }: { profile: ProfileSettings, creatorProfile: CreatorSettings | null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileBg}>
        <Image
          fill
          sizes="100%"
          priority
          src={profile.profile_bg || '/default_profile_bg.jpg'}
          alt="Profile Background"
        />
      </div>
      <div className={styles.card}>
        <div className={styles.profilePic}>
          <Image
            fill
            sizes="100%"
            priority
            src={profile.profile_pic || '/default_profile_pic.jpg'}
            alt="Profile"
          />
        </div>
        {!profile.show_x_link || !profile.x_link || (
          <a className={styles.xLink} target="_blank" href={profile.x_link} rel="noopener noreferrer">
            <div className={styles.icon}><Image fill sizes="100%" priority src="/icon-x.png" alt="X Link" /></div>
          </a>
        )}
        <p className={styles.nickname}>{profile.nickname}</p>
        {!creatorProfile || (
          <div className={styles.badgeContainer}>
            <Badge option={creatorProfile.seek_request ? 'seekRequest' : 'notSeekRequest'} />
            {!creatorProfile.allow_copyright_transfer || <Badge option="copyrightTransfer" />}
            {!creatorProfile.allow_hidden || <Badge option="hidden" />}
            {!creatorProfile.allow_anonymous || <Badge option="anonymous" />}
            {creatorProfile.allow_dm === 1 && <Badge option="dmOptional" />}
            {creatorProfile.allow_dm === 2 && <Badge option="dm" />}
          </div>
        )}
        <p className={styles.intro}>{profile.intro}</p>
      </div>
    </div>
  )
}

export default ProfileHeader
