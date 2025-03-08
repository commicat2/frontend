'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import CommonInput from 'components/common/CommonInput'
import CroppieModal from 'components/common/CroppieModal'
import IsLoading from 'components/common/IsLoading'
import { useUpdateProfileSettings } from 'lib/api/queryHooks'
import { isValidEnglishNickname, isValidXLink } from 'lib/utils/validators'
import styles from './ProfileSettingForm.module.css'

const ProfileSettingForm = ({ profileSettings, setProfileSettings, setRerenderNav }: {
  profileSettings: ProfileSettings, setProfileSettings: SetState<ProfileSettings>, setRerenderNav: SetState<boolean>
}) => {
  const { mutate, isPending } = useUpdateProfileSettings()
  const [profileInput, setProfileInput] = useState<ProfileSettings>({ ...profileSettings })
  const [isFileUploading, setIsFileUploading] = useState(false)
  const picRef = useRef<HTMLInputElement>(null)
  const bgRef = useRef<HTMLInputElement>(null)
  const [picFile, setPicFile] = useState<File | null>(null)
  const [bgFile, setBgFile] = useState<File | null>(null)
  const [editPic, setEditPic] = useState(false)
  const [editBg, setEditBg] = useState(false)
  const [croppieOptions, setCroppieOptions] = useState<CroppieOptions>({
    width: 0, height: 0, name: '', path: '', option: '',
  })

  const [saveMessage, setSaveMessage] = useState('')
  const [validateError, setValidateError] = useState('')

  useEffect(() => { setProfileInput({ ...profileSettings }) }, [profileSettings])

  const handleReset = () => { setProfileInput({ ...profileSettings }); setValidateError('') }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, type, checked, value,
    } = e.target
    if (type === 'checkbox') setProfileInput((prev) => { return { ...prev, [name]: checked } })
    else if (name === 'x_link') setProfileInput((prev) => { return { ...prev, show_x_link: value === '' ? false : prev.show_x_link, [name]: value } })
    else setProfileInput((prev) => { return { ...prev, [name]: value } })
  }

  const handleSubmit = (e: ProfileSettingFormEvent) => {
    e.preventDefault()
    if (isFileUploading) return
    switch (true) {
      case (!profileInput.english_nickname):
        setValidateError('아이디를 입력해주세요.')
        return
      case (!isValidEnglishNickname(profileInput.english_nickname || '')):
        setValidateError('아이디는 영어 소문자, 숫자, 밑줄(_)만 포함하여 2자 이상 입력해주세요.')
        return
      case (!profileInput.nickname):
        setValidateError('닉네임을 입력해주세요.')
        return
      case (profileInput.x_link && !isValidXLink(profileInput.x_link)):
        setValidateError('유효한 X 링크가 아닙니다.')
        return
      default:
        setValidateError('')
        break
    }

    const profileSettingsFormData: ProfileSettingFormData = new FormData()
    Object.entries(profileInput).forEach(([key, value]) => {
      if (value !== profileSettings[key as keyof ProfileSettings]) {
        if (key === 'profile_pic') profileSettingsFormData.append('profile_pic', picFile || '')
        else if (key === 'profile_bg') profileSettingsFormData.append('profile_bg', bgFile || '')
        else profileSettingsFormData.append(key, value as string)
      }
    })

    if (profileSettingsFormData.entries().next().done) return

    mutate({ profileSettingsFormData }, {
      onError: (error) => {
        setValidateError(
          error.response?.data?.english_nickname
          || error.response?.data?.nickname
          || '잠시 후 다시 시도해주세요.',
        )
      },
      onSuccess: () => {
        if ((profileInput.profile_pic !== profileSettings.profile_pic)
          || (profileInput.english_nickname !== profileSettings.english_nickname)
        ) setRerenderNav(true)
        setProfileSettings((prev) => { return { ...prev, ...profileInput } })
        setSaveMessage('저장 완료')
        setTimeout(() => { setSaveMessage('') }, 1500)
      },
    })
  }

  const handleCloseModal = () => {
    if (picRef.current?.value) picRef.current.value = ''
    if (bgRef.current?.value) bgRef.current.value = ''
    setIsFileUploading(false)
  }

  const handleImageProcessed = (file: File, option: string) => {
    handleCloseModal()
    if (option === 'pic') {
      setPicFile(file)
      setProfileInput((prev) => { return { ...prev, profile_pic: URL.createObjectURL(file) } })
    } else if (option === 'bg') {
      setBgFile(file)
      setProfileInput((prev) => { return { ...prev, profile_bg: URL.createObjectURL(file) } })
    } else setValidateError('다시 시도해주세요.')
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
    e.stopPropagation()
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setValidateError('webp, jpeg, png 파일을 등록해주세요.')
      return
    }

    const width = option === 'pic' ? 600 : 3200
    const height = option === 'pic' ? 600 : 800
    const name = `${profileInput.english_nickname}_profile_${option}`
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCroppieOptions({
          width, height, name, path: reader.result, option,
        })
        setIsFileUploading(true)
      } else { setValidateError('다시 시도해주세요.') }
    }
    reader.onerror = () => { setValidateError('다시 시도해주세요.') }
  }

  const handleEditClick = (inputRef: HTMLInputElement | null) => { if (inputRef) inputRef.click() }

  const deletePicInput = () => {
    setPicFile(null)
    setProfileInput({ ...profileInput, profile_pic: '' })
    if (picRef.current?.value) picRef.current.value = ''
  }

  const deleteBgInput = () => {
    setBgFile(null)
    setProfileInput({ ...profileInput, profile_bg: '' })
    if (bgRef.current?.value) bgRef.current.value = ''
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!isPending || <IsLoading />}
        <CommonInput
          label="아이디"
          name="english_nickname"
          value={profileInput.english_nickname || ''}
          onChange={handleChange}
          maxLength={15}
        />
        <CommonInput
          label="닉네임"
          name="nickname"
          value={profileInput.nickname || ''}
          onChange={handleChange}
          maxLength={15}
        />
        <div className={styles.container}>
          <div className={styles.label}>사진</div>
          <div className={styles.picInput}>
            <div onMouseEnter={() => { setEditPic(true) }} onMouseLeave={() => { setEditPic(false) }}>
              {!editPic || (
                <button className={styles.editPic} type="button" onClick={() => { handleEditClick(picRef.current) }}>
                  <Image fill sizes="100%" src="/edit.png" alt="Edit" />
                </button>
              )}
              <input
                id="profile_pic"
                type="file"
                style={{ display: 'none' }}
                ref={picRef}
                onChange={(e) => { handleUploadImage(e, 'pic') }}
              />
              <div className={styles.profilePicContainer}>
                <Image fill sizes="100%" priority src={profileInput.profile_pic || '/default_profile_pic.jpg'} alt="Profile" />
              </div>
            </div>
          </div>
          {!profileInput.profile_pic || (
            <button type="button" className={styles.deletePic} onClick={deletePicInput}>
              <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
            </button>
          )}
        </div>
        <div className={styles.container}>
          <div className={styles.label}>배경</div>
          <div className={styles.bgInput}>
            <div onMouseEnter={() => { setEditBg(true) }} onMouseLeave={() => { setEditBg(false) }}>
              {!editBg || (
                <button className={styles.editBg} type="button" onClick={() => { handleEditClick(bgRef.current) }}>
                  <Image fill sizes="100%" src="/edit_bg.png" alt="Edit" />
                </button>
              )}
              <input
                id="profile_bg"
                type="file"
                style={{ display: 'none' }}
                ref={bgRef}
                onChange={(e) => { handleUploadImage(e, 'bg') }}
              />
              <div className={styles.profileBgContainer}>
                <Image fill sizes="100%" priority src={profileInput?.profile_bg || '/default_profile_bg.jpg'} alt="Profile Background" />
              </div>
            </div>
            {!profileInput.profile_bg || (
              <button type="button" className={styles.delete} onClick={deleteBgInput}>
                <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
              </button>
            )}
          </div>
        </div>
        <CommonInput
          label="소개"
          name="intro"
          value={profileInput.intro || ''}
          onChange={handleChange}
          maxLength={50}
        />
        <CommonInput
          label="X 링크"
          name="x_link"
          value={profileInput.x_link || ''}
          onChange={handleChange}
          maxLength={50}
        />
        <div className={styles.container}>
          <input
            className={styles.checkBox}
            type="checkbox"
            name="show_x_link"
            checked={profileInput.show_x_link || false}
            disabled={!profileInput.x_link}
            onChange={handleChange}
          />
          <span className={styles.checkBoxComment}>프로필에 x 링크 보이기</span>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.error}>{validateError}</span>
          <p className={styles.saveMessage}>{saveMessage}</p>
          <button className={styles.button} type="submit" disabled={!!isPending}>저장</button>
          <button className={styles.button} type="button" disabled={!!isPending} onClick={handleReset}>초기화</button>
        </div>
      </form>
      {!isFileUploading || (
        <CroppieModal
          width={croppieOptions.width}
          height={croppieOptions.height}
          name={croppieOptions.name}
          path={croppieOptions.path}
          option={croppieOptions.option}
          closeModal={handleCloseModal}
          returnResult={handleImageProcessed}
        />
      )}
    </>
  )
}

export default ProfileSettingForm
