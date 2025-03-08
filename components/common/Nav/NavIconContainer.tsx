'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCheckHasUnread } from 'lib/api/queryHooks'
import styles from './NavIconContainer.module.css'

const NavIconContainer = ({
  hasUnreadNotification,
  setHasUnreadNotification,
  hasUnreadRequest,
  setHasUnreadRequest,
  hasUnreadDm,
  setHasUnreadDm,
}: {
  hasUnreadNotification: boolean
  setHasUnreadNotification: SetState<boolean>
  hasUnreadRequest: boolean
  setHasUnreadRequest: SetState<boolean>
  hasUnreadDm: boolean
  setHasUnreadDm: SetState<boolean>
}) => {
  const { data, refetch } = useCheckHasUnread()

  useEffect(() => {
    const pollHasUnread = setInterval(refetch, 30000)
    return () => { clearInterval(pollHasUnread) }
  }, [refetch])

  useEffect(() => {
    if (data) {
      setHasUnreadNotification(data.has_unread_notification)
      setHasUnreadRequest(data.has_unread_request)
      setHasUnreadDm(data.has_unread_dm)
    }
  }, [data, setHasUnreadNotification, setHasUnreadRequest, setHasUnreadDm])

  return (
    <div className={styles.iconContainer}>
      <Link className={styles.link} href="/notifications" prefetch={false}>
        <button className={styles.icon} type="button" onClick={() => { setHasUnreadNotification(false) }}>
          {!hasUnreadNotification ? (
            <Image fill sizes="100%" src="/icon-notification.png" alt="Notifications" />
          ) : (
            <Image fill sizes="100%" src="/icon-notification-unread.png" alt="Notifications" />
          )}
        </button>
      </Link>
      <Link className={styles.link} href="/requests" prefetch={false}>
        <button className={styles.icon} type="button" onClick={() => { setHasUnreadRequest(false) }}>
          {!hasUnreadRequest ? (
            <Image fill sizes="100%" src="/icon-request.png" alt="Requests" />
          ) : (
            <Image fill sizes="100%" src="/icon-request-unread.png" alt="Requests" />
          )}
        </button>
      </Link>
      <Link className={styles.link} href="/dm" prefetch={false}>
        <button className={styles.icon} type="button" onClick={() => { setHasUnreadDm(false) }}>
          {!hasUnreadDm ? (
            <Image fill sizes="100%" src="/icon-dm.png" alt="Direct Messages" />
          ) : (
            <Image fill sizes="100%" src="/icon-dm-unread.png" alt="Direct Messages" />
          )}
        </button>
      </Link>
    </div>
  )
}

export default NavIconContainer
