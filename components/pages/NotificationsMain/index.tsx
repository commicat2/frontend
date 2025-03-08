'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetNotifications } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import IsLoading from 'components/common/IsLoading'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import NotificationCards from 'components/common/cards/NotificationCards'
import styles from './index.module.css'

const NotificationsMain = () => {
  const {
    data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetNotifications()
  const router = useRouter()
  const [notifications, setNotifications] = useState<NotificationCard[]>([])

  useEffect(() => {
    if (!localStorage.getItem('jas') || isError) router.push('/sign-in')
  }, [isError, router])

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => {
    if (data?.pages) {
      const newNotifications = data.pages.flatMap((page) => { return page.results })
      setNotifications(newNotifications)
    }
  }, [data])

  useInfiniteScroll({
    requirement: hasNextPage && !isLoading && !isFetchingNextPage,
    action: fetchNextPage,
  })

  return (
    <main>
      {(!isLoading && !isFetchingNextPage) || <IsLoading />}
      <MainContainer>
        <MainContainerHeader>
          <p className={styles.headerText}>알림</p>
        </MainContainerHeader>
        <NotificationCards notifications={notifications} />
      </MainContainer>
    </main>
  )
}

export default NotificationsMain
