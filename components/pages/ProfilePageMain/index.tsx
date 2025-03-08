import ProfileHeader from './ProfileHeader'
import ProfileCreator from './ProfileCreator'
import ProfileRequests from './ProfileRequests'
import styles from './index.module.css'

const ProfilePageMain = ({
  id, profile, creator_profile, creator_works, client_works,
}: GetProfilePageResponse) => {
  return (
    <main className={styles.container}>
      <ProfileHeader profile={profile} creatorProfile={creator_profile} />
      <div className={styles.content}>
        {!creator_profile || <ProfileCreator id={id} creatorProfile={creator_profile} />}
        <ProfileRequests
          id={id}
          isCreator={!!creator_profile}
          portfolio={creator_profile?.portfolio || 0}
          creatorWorks={creator_works}
          clientWorks={client_works}
        />
      </div>
    </main>
  )
}

export default ProfilePageMain
