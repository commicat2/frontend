'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetFollowings } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import IsLoading from 'components/common/IsLoading'
import MainContainer from 'components/common/MainContainer'
import MainContainerButton from 'components/common/MainContainerButton'
import MainContainerHeader from 'components/common/MainContainerHeader'
import UserCards from 'components/common/cards/UserCards'

const FollowingsMain = ({ follower }: { follower: string }) => {
  const {
    data, refetch, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetFollowings(follower)
  const router = useRouter()
  const [followings, setFollowings] = useState<CreatorCard[]>([])
  const [followers, setFollowers] = useState<CreatorCard[]>([])

  useEffect(() => {
    if (!localStorage.getItem('jas') || isError) router.push('/sign-in')
  }, [router, isError])

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => {
    if (!data?.pages) return
    if (follower) {
      const newFollowers = data.pages.flatMap((page) => { return page.results })
      setFollowers(newFollowers)
    } else {
      const newFollowings = data.pages.flatMap((page) => { return page.results })
      setFollowings(newFollowings)
    }
  }, [data, follower])

  useInfiniteScroll({
    requirement: hasNextPage && !isLoading && !isFetchingNextPage,
    action: fetchNextPage,
  })

  return (
    <main>
      {(!isLoading && !isFetchingNextPage) || <IsLoading />}
      <MainContainer>
        <MainContainerHeader>
          <MainContainerButton
            selected={!follower}
            disabled={!follower}
            onClick={() => { return router.push('/followings') }}
          >
            팔로잉
          </MainContainerButton>
          <MainContainerButton
            selected={!!follower}
            disabled={!!follower}
            onClick={() => { return router.push('/followings?follower=true') }}
          >
            팔로워
          </MainContainerButton>
        </MainContainerHeader>
        {!follower ? <UserCards users={followings} /> : <UserCards users={followers} />}
      </MainContainer>
    </main>
  )
}

export default FollowingsMain
