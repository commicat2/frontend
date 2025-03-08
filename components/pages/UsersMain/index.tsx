'use client'

import { useEffect, useState } from 'react'
import { useGetUsers } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import IsLoading from 'components/common/IsLoading'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import UserCards from 'components/common/cards/UserCards'
import styles from './index.module.css'

const UsersMain = () => {
  const {
    data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetUsers()
  const [users, setUsers] = useState<UserCard[]>([])

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => {
    if (data?.pages) {
      const newUsers = data.pages.flatMap((page) => { return page.results })
      setUsers(newUsers)
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
          <p className={styles.headerText}>클라이언트</p>
        </MainContainerHeader>
        <UserCards users={users} />
      </MainContainer>
    </main>
  )
}

export default UsersMain
