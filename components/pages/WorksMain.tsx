'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetWorks } from 'lib/api/queryHooks'
import useInfiniteScroll from 'lib/hooks/useInfiniteScroll'
import { createQueryString } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import MainContainerButton from 'components/common/MainContainerButton'
import ImageCategoryButtons from 'components/common/categoryButtons/ImageCategoryButtons'
import AudioCategoryButtons from 'components/common/categoryButtons/AudioCategoryButtons'
import VideoCategoryButtons from 'components/common/categoryButtons/VideoCategoryButtons'
import TextCategoryButtons from 'components/common/categoryButtons/TextCategoryButtons'
import OtherCategoryButtons from 'components/common/categoryButtons/OtherCategoryButtons'
import HashTagsButtons from 'components/common/HashTagButtons'
import ImageCards from 'components/common/cards/ImageCards'
import AudioCards from 'components/common/cards/AudioCards'
import VideoCards from 'components/common/cards/VideoCards'
import TextCards from 'components/common/cards/TextCards'
import OtherCards from 'components/common/cards/OtherCards'
import styles from './WorksMain.module.css'

const WorksMain = ({
  genre, category, keyword, hashTag, hashTags,
}: { genre: Genre, category: CategoryKey, keyword: string, hashTag: string, hashTags: string[] }) => {
  const {
    data, refetch, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useGetWorks({
    genre, category, keyword, hashtag: hashTag,
  })
  const router = useRouter()
  const [works, setWorks] = useState<WorkThumbnail[]>([])

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => {
    if (data?.pages) {
      const newWorks = data.pages.flatMap((page) => { return page.results })
      setWorks(newWorks)
    }
  }, [data])

  const handleGenreClick = (selectedGenre: Genre) => {
    router.push(`/works/?${createQueryString({ genre: selectedGenre, keyword })}`)
  }
  const handleCategoryClick = (selectedCategory: CategoryKey) => {
    router.push(`/works?${createQueryString({ genre, category: selectedCategory, keyword })}`)
  }
  const handleHashTagClick = (selectedHashTag: string) => {
    router.push(`/works?${createQueryString({
      genre, category, keyword, hashTag: selectedHashTag,
    })}`)
  }

  useInfiniteScroll({
    requirement: hasNextPage && !isLoading && !isFetchingNextPage,
    action: fetchNextPage,
  })

  const renderWorks = () => {
    switch (genre) {
      case 'image':
        return (
          <>
            <div className={styles.category}>
              <ImageCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
            </div>
            <div className={styles.hashTags}>
              {!hashTags.length || <HashTagsButtons hashTag={hashTag} hashTags={hashTags} handleHashTagClick={handleHashTagClick} />}
            </div>
            <ImageCards works={works} />
          </>
        )
      case 'audio':
        return (
          <>
            <div className={styles.category}>
              <AudioCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
            </div>
            <div className={styles.hashTags}>
              {!hashTags.length || <HashTagsButtons hashTag={hashTag} hashTags={hashTags} handleHashTagClick={handleHashTagClick} />}
            </div>
            <AudioCards works={works} />
          </>
        )
      case 'video':
        return (
          <>
            <div className={styles.category}>
              <VideoCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
            </div>
            <div className={styles.hashTags}>
              {!hashTags.length || <HashTagsButtons hashTag={hashTag} hashTags={hashTags} handleHashTagClick={handleHashTagClick} />}
            </div>
            <VideoCards works={works} />
          </>
        )
      case 'text':
        return (
          <>
            <div className={styles.category}>
              <TextCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
            </div>
            <div className={styles.hashTags}>
              {!hashTags.length || <HashTagsButtons hashTag={hashTag} hashTags={hashTags} handleHashTagClick={handleHashTagClick} />}
            </div>
            <TextCards works={works} />
          </>
        )
      case 'other':
        return (
          <>
            <div className={styles.category}>
              <OtherCategoryButtons category={category} handleCategoryClick={handleCategoryClick} />
            </div>
            <div className={styles.hashTags}>
              {!hashTags.length || <HashTagsButtons hashTag={hashTag} hashTags={hashTags} handleHashTagClick={handleHashTagClick} />}
            </div>
            <OtherCards works={works} />
          </>
        )
      default: return <div className={styles.category} />
    }
  }

  return (
    <main>
      {(!isLoading && !isFetchingNextPage) || <IsLoading />}
      <MainContainer>
        <MainContainerHeader>
          <MainContainerButton
            selected={genre === 'image'}
            disabled={genre === 'image'}
            onClick={() => { handleGenreClick('image') }}
          >
            이미지
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'audio'}
            disabled={genre === 'audio'}
            onClick={() => { handleGenreClick('audio') }}
          >
            오디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'video'}
            disabled={genre === 'video'}
            onClick={() => { handleGenreClick('video') }}
          >
            비디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'text'}
            disabled={genre === 'text'}
            onClick={() => { handleGenreClick('text') }}
          >
            텍스트
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'other'}
            disabled={genre === 'other'}
            onClick={() => { handleGenreClick('other') }}
          >
            기타
          </MainContainerButton>
        </MainContainerHeader>
        {renderWorks()}
      </MainContainer>
    </main>
  )
}

export default WorksMain
