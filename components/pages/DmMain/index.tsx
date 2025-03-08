'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect, useEffect, useState } from 'react'
import { useGetDirectMessageRooms } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import { userIdFromJas } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import DmRoomList from './DmRoomList'
import DmRoom from './DmRoom'
import styles from './index.module.css'

const DmMain = () => {
  const {
    data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetDirectMessageRooms()
  const router = useRouter()
  const [rooms, setRooms] = useState<DirectMessageRoom[]>([])
  const [selectedId, setSelectedId] = useState(0)
  const [myId, setMyId] = useState(0)

  useLayoutEffect(() => {
    if (!localStorage.getItem('jas') || isError) router.push('/sign-in')
    else setMyId(userIdFromJas())
  }, [isError, router])

  useEffect(() => {
    const pollRooms = setInterval(refetch, 20000)
    return () => { clearInterval(pollRooms) }
  }, [refetch])

  useEffect(() => {
    if (data?.pages) {
      const newRooms = data.pages.flatMap((page) => { return page.results })
      setRooms(newRooms)
    }
  }, [data])

  useInfiniteScroll({
    requirement: hasNextPage && !isLoading && !isFetchingNextPage,
    action: fetchNextPage,
  })

  return (
    <main className={styles.container}>
      {(!isLoading && !isFetchingNextPage) || <IsLoading />}
      <div className={styles.rooms}>
        <MainContainerSubHeader>
          <p className={styles.headerText}>DM</p>
        </MainContainerSubHeader>
        <DmRoomList rooms={rooms} selectedId={selectedId} setSelectedId={setSelectedId} myId={myId} />
      </div>
      {!selectedId || (
        <div className={styles.room}>
          <DmRoom selectedId={selectedId} setSelectedId={setSelectedId} myId={myId} refetchRooms={refetch} />
        </div>
      )}
    </main>
  )
}

export default DmMain
