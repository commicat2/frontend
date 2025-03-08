import Image from 'next/image'
import Link from 'next/link'
import styles from './UserCards.module.css'

const UserCards = ({ users }: { users: UserCard[] }) => {
  return (
    <div className={styles.container}>
      {users.map((user) => {
        return (
          <Link key={user.pk} className={styles.card} href={`/@${user.english_nickname}`} prefetch={false}>
            <div className={styles.profilePic}>
              <Image
                fill
                sizes="100%"
                priority
                src={user.profile_pic || '/default_profile_pic.jpg'}
                alt="Profile"
              />
            </div>
            <div className={styles.nicknameContainer}>
              <p className={styles.nickname}>{user.nickname}</p>
              <p className={styles.englishNickname}>{`@${user.english_nickname}`}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default UserCards
