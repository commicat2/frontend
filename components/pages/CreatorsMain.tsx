'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetCreators } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import { createQueryString } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import Badge from 'components/common/Badge'
import MainContainer from 'components/common/MainContainer'
import MainContainerButton from 'components/common/MainContainerButton'
import MainContainerHeader from 'components/common/MainContainerHeader'
import ImageCategoryButtons from 'components/common/categoryButtons/ImageCategoryButtons'
import AudioCategoryButtons from 'components/common/categoryButtons/AudioCategoryButtons'
import VideoCategoryButtons from 'components/common/categoryButtons/VideoCategoryButtons'
import TextCategoryButtons from 'components/common/categoryButtons/TextCategoryButtons'
import OtherCategoryButtons from 'components/common/categoryButtons/OtherCategoryButtons'
import CreatorCards from 'components/common/cards/CreatorCards'
import styles from './CreatorsMain.module.css'

const CreatorsMain = ({
  genre, category, seek_request, keyword,
}: { genre: Genre, category: CategoryKey, seek_request: string, keyword: string }) => {
  const {
    data, isLoading, refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetCreators({
    genre, category, seek_request, keyword,
  })
  const router = useRouter()
  const [creators, setCreators] = useState<CreatorCard[]>([])

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => {
    if (data?.pages) {
      const newCreators = data.pages.flatMap((page) => { return page.results })
      setCreators(newCreators)
    }
  }, [data])

  const handleGenreClick = (selectedGenre: Genre) => {
    router.push(`/creators?${createQueryString({
      genre: selectedGenre, keyword, seek_request,
    })}`)
  }
  const handleCategoryClick = (selectedCategory: string) => {
    router.push(`/creators?${createQueryString({
      genre, category: selectedCategory, keyword, seek_request,
    })}`)
  }
  const handleSeekRequestClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/creators?${createQueryString({
      genre, category, keyword, seek_request: seek_request ? '' : 'true',
    })}`)
  }

  useInfiniteScroll({
    requirement: hasNextPage && !isLoading && !isFetchingNextPage,
    action: fetchNextPage,
  })

  const renderCategoryButtons = () => {
    switch (genre) {
      case 'image':
        return <ImageCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
      case 'audio':
        return <AudioCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
      case 'video':
        return <VideoCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
      case 'text':
        return <TextCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
      case 'other':
        return <OtherCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
      default: return null
    }
  }

  return (
    <main>
      {(isLoading || isFetchingNextPage) && <IsLoading />}
      <MainContainer>
        <p className={styles.headerText}>크리에이터</p>
        <MainContainerHeader>
          <MainContainerButton
            selected={genre === 'all'}
            disabled={genre === 'all'}
            onClick={() => { return handleGenreClick('all') }}
          >
            전체
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'image'}
            disabled={genre === 'image'}
            onClick={() => { return handleGenreClick('image') }}
          >
            이미지
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'audio'}
            disabled={genre === 'audio'}
            onClick={() => { return handleGenreClick('audio') }}
          >
            오디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'video'}
            disabled={genre === 'video'}
            onClick={() => { return handleGenreClick('video') }}
          >
            비디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'text'}
            disabled={genre === 'text'}
            onClick={() => { return handleGenreClick('text') }}
          >
            텍스트
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'other'}
            disabled={genre === 'other'}
            onClick={() => { return handleGenreClick('other') }}
          >
            기타
          </MainContainerButton>
        </MainContainerHeader>
        <div className={styles.categoryContainer}>{renderCategoryButtons()}</div>
        <div className={styles.seekRequest}>
          <button type="button" aria-label="모집중" onClick={handleSeekRequestClick}>
            {seek_request ? <Badge option="seekRequest" /> : <Badge option="seekRequestButton" />}
          </button>
        </div>
        <CreatorCards creators={creators} />
      </MainContainer>
    </main>
  )
}

export default CreatorsMain
