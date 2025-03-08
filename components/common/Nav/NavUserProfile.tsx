import Image from 'next/image'
import Link from 'next/link'
import styles from './NavUserProfile.module.css'

const NavUserProfile = ({
  profilePic, englishNickname, openMenus, setOpenMenus, handleLogout,
}: {
  profilePic: string, englishNickname: string, openMenus: boolean, setOpenMenus: SetState<boolean>, handleLogout: () => Promise<void>
}) => {
  return (
    <div className={styles.profile} onMouseEnter={() => { setOpenMenus(true) }} onMouseLeave={() => { setOpenMenus(false) }}>
      <div className={styles.profilePic}>
        <Image fill sizes="100%" priority src={profilePic || '/default_profile_pic.jpg'} alt="Profile" />
      </div>
      {!openMenus || (
        <div className={styles.menuContainer}>
          <div className={styles.menus}>
            {!englishNickname || (
              <Link href={`/@${englishNickname}`} prefetch={false}>
                <button className={styles.menu} type="button" onClick={() => { setOpenMenus(false) }}>내 프로필</button>
              </Link>
            )}
            <Link href="/settings" prefetch={false}>
              <button className={styles.menu} type="button" onClick={() => { setOpenMenus(false) }}>설정</button>
            </Link>
            <Link href="/followings" prefetch={false}>
              <button className={styles.menu} type="button" onClick={() => { setOpenMenus(false) }}>팔로잉</button>
            </Link>
            <button className={styles.menu} type="button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavUserProfile
