import { useLayoutEffect, useState } from 'react'
import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'
import ImageCards from 'components/common/cards/ImageCards'
import AudioCards from 'components/common/cards/AudioCards'
import VideoCards from 'components/common/cards/VideoCards'
import TextCards from 'components/common/cards/TextCards'
import OtherCards from 'components/common/cards/OtherCards'

const Works = ({ works }: { works: WorkThumbnails }) => {
  const [genre, setGenre] = useState<Genre | null>(null)
  const [workGenres, setWorkGenres] = useState<Record<string, boolean>>({})

  useLayoutEffect(() => {
    if (!works) return
    const GENRES = {
      image: works[1].length > 0,
      audio: works[2].length > 0,
      video: works[3].length > 0,
      text: works[4].length > 0,
      other: works[5].length > 0,
    }
    setWorkGenres(GENRES)
    switch (true) {
      case GENRES.image:
        setGenre('image')
        break
      case GENRES.audio:
        setGenre('audio')
        break
      case GENRES.video:
        setGenre('video')
        break
      case GENRES.text:
        setGenre('text')
        break
      case GENRES.other:
        setGenre('other')
        break
      default:
        break
    }
  }, [works])

  const renderButtons = () => {
    return (
      <>
        {!workGenres.image || (
          <MainContainerSubButton
            selected={genre === 'image'}
            disabled={genre === 'image'}
            onClick={() => { setGenre('image') }}
          >
            이미지
          </MainContainerSubButton>
        )}
        {!workGenres.audio || (
          <MainContainerSubButton
            selected={genre === 'audio'}
            disabled={genre === 'audio'}
            onClick={() => { setGenre('audio') }}
          >
            오디오
          </MainContainerSubButton>
        )}
        {!workGenres.video || (
          <MainContainerSubButton
            selected={genre === 'video'}
            disabled={genre === 'video'}
            onClick={() => { setGenre('video') }}
          >
            비디오
          </MainContainerSubButton>
        )}
        {!workGenres.text || (
          <MainContainerSubButton
            selected={genre === 'text'}
            disabled={genre === 'text'}
            onClick={() => { setGenre('text') }}
          >
            텍스트
          </MainContainerSubButton>
        )}
        {!workGenres.other || (
          <MainContainerSubButton
            selected={genre === 'other'}
            disabled={genre === 'other'}
            onClick={() => { setGenre('other') }}
          >
            기타
          </MainContainerSubButton>
        )}
      </>
    )
  }

  const renderWorks = () => {
    switch (genre) {
      case 'image':
        return <ImageCards works={works[1]} />
      case 'audio':
        return <AudioCards works={works[2]} />
      case 'video':
        return <VideoCards works={works[3]} />
      case 'text':
        return <TextCards works={works[4]} />
      case 'other':
        return <OtherCards works={works[5]} />
      default:
        return null
    }
  }

  return (
    <>
      <MainContainerSubHeader>
        {renderButtons()}
      </MainContainerSubHeader>
      {renderWorks()}
    </>
  )
}

export default Works
