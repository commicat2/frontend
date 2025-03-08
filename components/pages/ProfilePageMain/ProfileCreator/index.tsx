'use client'

import Image from 'next/image'
import {
  useCallback, useMemo, useLayoutEffect, useState,
} from 'react'
import { checkIsMyFollowing, toggleFollowing } from 'lib/api/queryFunctions'
import { useCreateDmRoom } from 'lib/api/queryHooks'
import { userIdFromJas } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import Modal from 'components/common/Modal'
import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'
import CreateRequestForm from './CreateRequestForm'
import ProfileCreatorRequest from './ProfileCreatorRequest'
import styles from './index.module.css'

const ProfileCreator = ({ id, creatorProfile }: Id & { creatorProfile: CreatorSettings }) => {
  const { mutate, isPending } = useCreateDmRoom(id)
  const [isMyPage, setIsMyPage] = useState(false)
  const [isMyFollowing, setIsMyFollowing] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [createRequest, setCreateRequest] = useState(false)
  const [isSendDmModalOpen, setIsSendDmModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const ALLOW_GENRES = useMemo(() => {
    return {
      1: creatorProfile.allow_image_category.length > 0,
      2: creatorProfile.allow_audio_category.length > 0,
      3: creatorProfile.allow_video_category.length > 0,
      4: creatorProfile.allow_text_category.length > 0,
      5: creatorProfile.allow_other_category.length > 0,
    }
  }, [creatorProfile])

  const allowGenres: SelectOption<GenreNumber, GenreKr>[] = useMemo(() => {
    const temp: SelectOption<GenreNumber, GenreKr>[] = []
    if (ALLOW_GENRES[1]) temp.push({ value: 1, label: '이미지' })
    if (ALLOW_GENRES[2]) temp.push({ value: 2, label: '오디오' })
    if (ALLOW_GENRES[3]) temp.push({ value: 3, label: '비디오' })
    if (ALLOW_GENRES[4]) temp.push({ value: 4, label: '텍스트' })
    if (ALLOW_GENRES[5]) temp.push({ value: 5, label: '기타' })
    return temp
  }, [ALLOW_GENRES])

  const getFirstGenre: () => Genre = useCallback(() => {
    if (ALLOW_GENRES[1]) return 'image'
    if (ALLOW_GENRES[2]) return 'audio'
    if (ALLOW_GENRES[3]) return 'video'
    if (ALLOW_GENRES[4]) return 'text'
    if (ALLOW_GENRES[5]) return 'other'
    return 'image'
  }, [ALLOW_GENRES])

  const [genre, setGenre] = useState<Genre>(getFirstGenre())

  const handleCheckIsMyFollowings = useCallback(async () => {
    try {
      const { is_following } = await checkIsMyFollowing(id)
      setIsMyFollowing(is_following)
      setShowButtons(true)
    } catch { setShowButtons(false) }
  }, [id])

  useLayoutEffect(() => {
    if (id === userIdFromJas()) setIsMyPage(true)
    else if (localStorage.getItem('jas')) handleCheckIsMyFollowings()
  }, [handleCheckIsMyFollowings, id])

  const renderGenreButtons = () => {
    return (
      <>
        {!ALLOW_GENRES[1] || (
          <MainContainerSubButton
            selected={genre === 'image'}
            disabled={genre === 'image'}
            onClick={() => { setGenre('image') }}
          >
            이미지
          </MainContainerSubButton>
        )}
        {!ALLOW_GENRES[2] || (
          <MainContainerSubButton
            selected={genre === 'audio'}
            disabled={genre === 'audio'}
            onClick={() => { setGenre('audio') }}
          >
            오디오
          </MainContainerSubButton>
        )}
        {!ALLOW_GENRES[3] || (
          <MainContainerSubButton
            selected={genre === 'video'}
            disabled={genre === 'video'}
            onClick={() => { setGenre('video') }}
          >
            비디오
          </MainContainerSubButton>
        )}
        {!ALLOW_GENRES[4] || (
          <MainContainerSubButton
            selected={genre === 'text'}
            disabled={genre === 'text'}
            onClick={() => { setGenre('text') }}
          >
            텍스트
          </MainContainerSubButton>
        )}
        {!ALLOW_GENRES[5] || (
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

  const handleToggleFollowing = useCallback(async () => {
    const { success } = await toggleFollowing(id)
    if (success) setIsMyFollowing((prev) => { return !prev })
  }, [id])

  const handleCreateDmRoom = useCallback((content: string) => {
    if (!content) setErrorMessage('메시지를 입력해주세요.')
    else {
      mutate({ content }, {
        onError: (error) => { setErrorMessage(error.response?.data?.message || '다시 시도해주세요.') },
        onSuccess: () => { setSuccessMessage('DM이 전송되었습니다.') },
      })
    }
  }, [mutate])

  const { seek_request, allow_dm } = creatorProfile
  const buttons: React.ReactNode[] = useMemo(() => {
    const tempButtons: React.ReactNode[] = []
    if (isMyPage) return []
    tempButtons.push(
      <button
        key="1"
        className={`${isMyFollowing ? styles.followCancleButton : styles.followButton} ${styles.button}`}
        type="button"
        onClick={handleToggleFollowing}
      >
        <div className={styles.icon}>
          <Image fill sizes="100%" src="/icon-follow.png" alt="Follow" />
        </div>
        <p>{isMyFollowing ? '팔로우 해제' : '팔로우 하기'}</p>
      </button>,
    )
    if (seek_request) {
      tempButtons.push(
        <button
          key="2"
          className={`${styles.button} ${styles.requestButton}`}
          type="button"
          onClick={() => { setCreateRequest((prev) => { return !prev }) }}
        >
          <div className={styles.icon}>
            <Image
              fill
              sizes="100%"
              src="/icon-request.png"
              alt="Request"
            />
          </div>
          <p>작업 요청하기</p>
        </button>,
      )
    }
    if (allow_dm) {
      tempButtons.push(
        <button
          key="3"
          className={`${styles.button} ${styles.dmButton}`}
          type="button"
          onClick={() => { setIsSendDmModalOpen(true) }}
        >
          <div className={styles.icon}>
            <Image
              fill
              sizes="100%"
              src="/icon-dm.png"
              alt="Direct Message"
            />
          </div>
          <p>DM 보내기</p>
        </button>,
      )
    }
    return tempButtons.filter(Boolean)
  }, [seek_request, allow_dm, handleToggleFollowing, isMyFollowing, isMyPage])

  const renderProfileCreatorRequest = () => {
    if (!creatorProfile) return null
    let min_amount = 10000
    let response_expiration_days = 7
    let complete_expiration_days = 30
    let response_total_days = 0
    let response_total = 0
    let complete_total_days = 0
    let complete_total = 0
    let expire_total = 0
    switch (genre) {
      case 'image':
        min_amount = creatorProfile.min_amount_image
        response_expiration_days = creatorProfile.response_expiration_days_image
        complete_expiration_days = creatorProfile.complete_expiration_days_image
        response_total_days = creatorProfile.response_total_days_image
        response_total = creatorProfile.response_total_image
        complete_total_days = creatorProfile.complete_total_days_image
        complete_total = creatorProfile.complete_total_image
        expire_total = creatorProfile.expire_total_image
        break
      case 'audio':
        min_amount = creatorProfile.min_amount_audio
        response_expiration_days = creatorProfile.response_expiration_days_audio
        complete_expiration_days = creatorProfile.complete_expiration_days_audio
        response_total_days = creatorProfile.response_total_days_audio
        response_total = creatorProfile.response_total_audio
        complete_total_days = creatorProfile.complete_total_days_audio
        complete_total = creatorProfile.complete_total_audio
        expire_total = creatorProfile.expire_total_audio
        break
      case 'video':
        min_amount = creatorProfile.min_amount_video
        response_expiration_days = creatorProfile.response_expiration_days_video
        complete_expiration_days = creatorProfile.complete_expiration_days_video
        response_total_days = creatorProfile.response_total_days_video
        response_total = creatorProfile.response_total_video
        complete_total_days = creatorProfile.complete_total_days_video
        complete_total = creatorProfile.complete_total_video
        expire_total = creatorProfile.expire_total_video
        break
      case 'text':
        min_amount = creatorProfile.min_amount_text
        response_expiration_days = creatorProfile.response_expiration_days_text
        complete_expiration_days = creatorProfile.complete_expiration_days_text
        response_total_days = creatorProfile.response_total_days_text
        response_total = creatorProfile.response_total_text
        complete_total_days = creatorProfile.complete_total_days_text
        complete_total = creatorProfile.complete_total_text
        expire_total = creatorProfile.expire_total_text
        break
      case 'other':
        min_amount = creatorProfile.min_amount_other
        response_expiration_days = creatorProfile.response_expiration_days_other
        complete_expiration_days = creatorProfile.complete_expiration_days_other
        response_total_days = creatorProfile.response_total_days_other
        response_total = creatorProfile.response_total_other
        complete_total_days = creatorProfile.complete_total_days_other
        complete_total = creatorProfile.complete_total_other
        expire_total = creatorProfile.expire_total_other
        break
      default:
        break
    }
    return (
      <ProfileCreatorRequest
        min_amount={min_amount}
        response_expiration_days={response_expiration_days}
        complete_expiration_days={complete_expiration_days}
        response_total_days={response_total_days}
        response_total={response_total}
        complete_total_days={complete_total_days}
        complete_total={complete_total}
        expire_total={expire_total}
      />
    )
  }

  return (
    <>
      {!isPending || <IsLoading />}
      <div className={styles.container}>
        <MainContainerSubHeader>
          {renderGenreButtons()}
        </MainContainerSubHeader>
        {!seek_request || renderProfileCreatorRequest()}
        {!showButtons || <div className={styles.buttons}>{buttons}</div>}
      </div>
      {!createRequest || (
        <CreateRequestForm
          id={id}
          firstGenre={getFirstGenre()}
          allowGenres={allowGenres}
          creatorProfile={creatorProfile}
          setCreateRequest={setCreateRequest}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {!isSendDmModalOpen || (
        <Modal
          option="sendDm"
          closeModal={() => { setIsSendDmModalOpen(false) }}
          returnResult={(content) => { return handleCreateDmRoom(content || '') }}
        />
      )}
      {!successMessage || (
        <Modal
          option="common"
          content={successMessage}
          closeModal={() => { setSuccessMessage('') }}
        />
      )}
      {!errorMessage || (
        <Modal
          option="common"
          content={errorMessage}
          closeModal={() => { setErrorMessage('') }}
        />
      )}
    </>
  )
}

export default ProfileCreator
