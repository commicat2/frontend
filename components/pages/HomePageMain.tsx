'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import MainContainer from 'components/common/MainContainer'
import MainContainerButton from 'components/common/MainContainerButton'
import MainContainerHeader from 'components/common/MainContainerHeader'
import ImageCards from 'components/common/cards/ImageCards'
import AudioCards from 'components/common/cards/AudioCards'
import VideoCards from 'components/common/cards/VideoCards'
import TextCards from 'components/common/cards/TextCards'
import OtherCards from 'components/common/cards/OtherCards'
import CreatorCards from 'components/common/cards/CreatorCards'
import UserCards from 'components/common/cards/UserCards'
import styles from './HomePageMain.module.css'

const HomePageMain = ({
  image_works, audio_works, video_works, text_works, other_works, creators, users, keyword,
}: GetHomePageResponse & Keyword) => {
  const [genre, setGenre] = useState<Genre>('image')

  const renderWorks = () => {
    if (genre === 'audio') return <AudioCards works={audio_works} />
    if (genre === 'video') return <VideoCards works={video_works} />
    if (genre === 'text') return <TextCards works={text_works} />
    if (genre === 'other') return <OtherCards works={other_works} />
    return <ImageCards works={image_works} />
  }

  return (
    <main className={styles.container}>
      <MainContainer>
        <MainContainerHeader>
          <MainContainerButton
            selected={genre === 'image'}
            disabled={genre === 'image'}
            onClick={() => { setGenre('image') }}
          >
            이미지
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'audio'}
            disabled={genre === 'audio'}
            onClick={() => { setGenre('audio') }}
          >
            오디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'video'}
            disabled={genre === 'video'}
            onClick={() => { setGenre('video') }}
          >
            비디오
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'text'}
            disabled={genre === 'text'}
            onClick={() => { setGenre('text') }}
          >
            텍스트
          </MainContainerButton>
          <MainContainerButton
            selected={genre === 'other'}
            disabled={genre === 'other'}
            onClick={() => { setGenre('other') }}
          >
            기타
          </MainContainerButton>
        </MainContainerHeader>
        {renderWorks()}
        <Link className={styles.seeMore} href={`works/?genre=${genre}${keyword ? `&keyword=${keyword}` : ''}`} prefetch={false}>
          more
          <div className={styles.plus}>
            <Image fill sizes="100%" priority src="/plus.png" alt="See more" />
          </div>
        </Link>
      </MainContainer>
      <MainContainer>
        <MainContainerHeader>
          <p className={styles.headerText}>크리에이터</p>
        </MainContainerHeader>
        <CreatorCards creators={creators} />
        <Link className={styles.seeMore} href={`creators/${keyword ? `?keyword=${keyword}` : ''}`} prefetch={false}>
          more
          <div className={styles.plus}>
            <Image fill sizes="100%" priority src="/plus.png" alt="See more" />
          </div>
        </Link>
      </MainContainer>
      {!keyword && (
        <MainContainer>
          <MainContainerHeader>
            <p className={styles.headerText}>클라이언트</p>
          </MainContainerHeader>
          <UserCards users={users} />
          <Link className={styles.seeMore} href="users/" prefetch={false}>
            more
            <div className={styles.plus}>
              <Image fill sizes="100%" priority src="/plus.png" alt="See more" />
            </div>
          </Link>
        </MainContainer>
      )}
    </main>
  )
}

export default HomePageMain
