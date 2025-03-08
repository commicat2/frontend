'use client'

import { useCallback, useEffect, useState } from 'react'
import { signOut } from 'lib/api/queryFunctions'
import { useGetNavInfo } from 'lib/api/queryHooks'
import ButtonLink from 'components/common/ButtonLink'
import NavLogo from './NavLogo'
import NavIconContainer from './NavIconContainer'
import NavUserProfile from './NavUserProfile'
import SearchBar from './SearchBar'
import styles from './index.module.css'

const Nav = ({ rerenderNav, setRerenderNav }: { rerenderNav?: boolean, setRerenderNav?: SetState<boolean> }) => {
  const { refetch, isError } = useGetNavInfo()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isNotAuthenticated, setIsNotAuthenticated] = useState(false)
  const [openMenus, setOpenMenus] = useState(false)
  const [profilePic, setProfilePic] = useState('')
  const [englishNickname, setEnglishNickname] = useState('')
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false)
  const [hasUnreadRequest, setHasUnreadRequest] = useState(false)
  const [hasUnreadDm, setHasUnreadDm] = useState(false)

  useEffect(() => {
    const handleGetNavInfo = async () => {
      const { data } = await refetch()
      if (data) {
        const { user } = data
        setProfilePic(data.profile_pic || '')
        setEnglishNickname(data.english_nickname || '')
        setHasUnreadNotification(user?.has_unread_notification || false)
        setHasUnreadRequest(user?.has_unread_request || false)
        setHasUnreadDm(user?.has_unread_dm || false)
        setIsAuthenticated(true)
        setIsNotAuthenticated(false)
      }
    }
    if (!localStorage.getItem('jas') || isError) { setIsAuthenticated(false); setIsNotAuthenticated(true); return }
    if (rerenderNav && setRerenderNav) setRerenderNav(false)
    handleGetNavInfo()
  }, [refetch, isError, rerenderNav, setRerenderNav])

  const handleLogout = useCallback(async () => {
    const unparsedEcs = localStorage.getItem('ecs')
    const ecs = unparsedEcs ? JSON.parse(unparsedEcs) as string : ''
    if (ecs) { await signOut({ ecs }) }
    localStorage.removeItem('jas')
    localStorage.removeItem('ecs')
    window.location.reload()
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <NavLogo />
        {!isAuthenticated || (
          <NavIconContainer
            hasUnreadNotification={hasUnreadNotification}
            setHasUnreadNotification={setHasUnreadNotification}
            hasUnreadRequest={hasUnreadRequest}
            setHasUnreadRequest={setHasUnreadRequest}
            hasUnreadDm={hasUnreadDm}
            setHasUnreadDm={setHasUnreadDm}
          />
        )}
      </div>
      {(!isNotAuthenticated && !isAuthenticated) || <div className={styles.searchBar}><SearchBar /></div>}
      {!isAuthenticated || (
        <NavUserProfile
          profilePic={profilePic}
          englishNickname={englishNickname}
          openMenus={openMenus}
          setOpenMenus={setOpenMenus}
          handleLogout={handleLogout}
        />
      )}
      {!isNotAuthenticated || <ButtonLink className={styles.styledButtonLink} href="/sign-in">로그인</ButtonLink>}
    </nav>
  )
}

export default Nav
