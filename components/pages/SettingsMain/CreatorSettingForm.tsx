'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { useUpdateCreatorSettings } from 'lib/api/queryHooks'
import {
  ALLOW_DM_OPTIONS,
  ALLOW_DM_OPTIONS_ARRAY,
  IMAGE_CATEGORY,
  AUDIO_CATEGORY,
  VIDEO_CATEGORY,
  TEXT_CATEGORY,
  OTHER_CATEGORY,
} from 'lib/constants'
import useCategoryState from 'lib/hooks/useCategoryState'
import { categoryToOptions, sortCategories, formatNumber } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import CommonInput from 'components/common/CommonInput'
import CommonCheckboxInput from 'components/common/CommonCheckboxInput'
import styles from './CreatorSettingForm.module.css'

const CreatorSettingForm = ({
  creatorSettings, setCreatorSettings, xLink, englishNickname,
}: {
  creatorSettings: CreatorSettings, setCreatorSettings: SetState<CreatorSettings>, xLink: string, englishNickname: string
}) => {
  const { mutate, isPending } = useUpdateCreatorSettings()
  const [creatorInput, setCreatorInput] = useState<CreatorInput>({ ...creatorSettings })
  const [imageOptions, setImageOptions] = useCategoryState(creatorSettings.allow_image_category, 'image')
  const [audioOptions, setAudioOptions] = useCategoryState(creatorSettings.allow_audio_category, 'audio')
  const [videoOptions, setVideoOptions] = useCategoryState(creatorSettings.allow_video_category, 'video')
  const [textOptions, setTextOptions] = useCategoryState(creatorSettings.allow_text_category, 'text')
  const [otherOptions, setOtherOptions] = useCategoryState(creatorSettings.allow_other_category, 'other')
  const [dmOption, setAllowDmOption] = useState<SelectOption<DmNumber, DmOption>>({
    value: creatorSettings.allow_dm,
    label: ALLOW_DM_OPTIONS_ARRAY[creatorSettings.allow_dm || 0],
  })
  const [saveMessage, setSaveMessage] = useState('')
  const [validateError, setValidateError] = useState('')

  const formatCreatorInput = (input: CreatorSettings): CreatorSettings => {
    return Object.entries(input).reduce((acc, [key, value]) => {
      let formattedValue = value as string
      if (key.startsWith('min_amount')) formattedValue = `${formatNumber(Number(value) - (Number(value) % 1000))}원`
      else if (key.startsWith('response_expiration_days') || key.startsWith('complete_expiration_days')) formattedValue = `${formatNumber(Number(value))}일`
      acc[key as keyof CreatorSettings] = formattedValue as never
      return acc
    }, {} as CreatorSettings)
  }

  const handleReset = () => {
    const formatCreatorSettings: CreatorSettings = formatCreatorInput(creatorSettings)
    setCreatorInput({ ...formatCreatorSettings })
    setImageOptions(categoryToOptions({ categories: creatorSettings.allow_image_category, genre: 'image' }))
    setAudioOptions(categoryToOptions({ categories: creatorSettings.allow_audio_category, genre: 'audio' }))
    setVideoOptions(categoryToOptions({ categories: creatorSettings.allow_video_category, genre: 'video' }))
    setTextOptions(categoryToOptions({ categories: creatorSettings.allow_text_category, genre: 'text' }))
    setOtherOptions(categoryToOptions({ categories: creatorSettings.allow_other_category, genre: 'other' }))
    setAllowDmOption({ value: creatorSettings.allow_dm, label: ALLOW_DM_OPTIONS_ARRAY[creatorSettings.allow_dm] })
    setValidateError('')
  }

  useEffect(() => {
    handleReset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatorSettings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, type, checked, value,
    } = e.target
    if (name === 'allow_hidden' && checked === false) setCreatorInput({ ...creatorInput, allow_hidden: checked, allow_hidden_only: false })
    else setCreatorInput({ ...creatorInput, [name]: type === 'checkbox' ? checked : value })
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('min_amount') || name.startsWith('response_expiration_days') || name.startsWith('complete_expiration_days')) {
      setCreatorInput({ ...creatorInput, [name]: value.replace(/[^0-9]/g, '') })
    }
  }

  const formatInputValue = (name: string, value: number) => {
    let validatedValue = ''
    let validatedNumber = value
    if (name.startsWith('min_amount')) {
      validatedNumber = value - (value % 1000)
      if (Number.isNaN(validatedNumber) || validatedNumber < 10000) validatedValue = '10,000원'
      else if (validatedNumber > 100000000000) validatedValue = '100,000,000,000원'
      else validatedValue = `${formatNumber(validatedNumber)}원`
    }
    if (name.startsWith('response_expiration_days')) {
      if (Number.isNaN(value) || value < 1) validatedValue = '1일'
      else if (value > 365) validatedValue = '365일'
      else validatedValue = `${formatNumber(value)}일`
    }
    if (name.startsWith('complete_expiration_days')) {
      if (Number.isNaN(value) || value < 1) validatedValue = '1일'
      else if (value > 3650) validatedValue = '3,650일'
      else validatedValue = `${formatNumber(value)}일`
    }
    return validatedValue
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formattedValue = formatInputValue(name, Number(value))
    setCreatorInput((prev) => { return { ...prev, [name]: formattedValue } })
  }

  const handleAllowDmChange = (
    newValue: SingleValue<SelectOption<DmNumber, DmOption>>,
    actionMeta: ActionMeta<SelectOption<DmNumber, DmOption>>,
  ) => {
    if (actionMeta.action === 'select-option' && newValue) {
      const option = newValue
      setCreatorInput({ ...creatorInput, allow_dm: option.value })
      setAllowDmOption({
        value: option.value,
        label: ALLOW_DM_OPTIONS_ARRAY[option.value || 0],
      })
    }
  }

  const handleSubmit = () => {
    if (creatorInput.seek_request
      && (!imageOptions?.length
        && !audioOptions?.length
        && !videoOptions?.length
        && !textOptions?.length
        && !otherOptions?.length)
    ) { setValidateError('요청 받을 카테고리를 선택해주세요.'); return }

    const creatorSettingsFormData: CreatorSettingFormData = {}
    Object.entries(creatorInput).forEach(([key, value]: [string, unknown]) => {
      if (key.startsWith('min_amount') || key.startsWith('response_expiration_days') || key.startsWith('complete_expiration_days')) {
        const numberValue = Number((value as string).replace(/[^0-9]/g, ''))
        if (numberValue !== creatorSettings[key as keyof CreatorSettings]) {
          creatorSettingsFormData[key as keyof CreatorSettingFormData] = numberValue as never
        }
      } else if (value !== creatorSettings[key as keyof CreatorSettings]) {
        creatorSettingsFormData[key as keyof CreatorSettingFormData] = value as never
      }
    })

    const categories = ['image', 'audio', 'video', 'text', 'other']

    categories.forEach((category) => {
      const formDataKey = `allow_${category}_category`
      let options: SelectOption<CategoryKey, Category>[]
      switch (category) {
        case 'audio':
          options = audioOptions
          break
        case 'video':
          options = videoOptions
          break
        case 'text':
          options = textOptions
          break
        case 'other':
          options = otherOptions
          break
        default:
          options = imageOptions
          break
      }
      const formDataValue = sortCategories(options.map((option) => { return option.value }))

      if (JSON.stringify(formDataValue)
        !== JSON.stringify(creatorSettings[`allow_${category}_category` as keyof CreatorSettingFormData])) {
        creatorSettingsFormData[
          formDataKey as keyof CreatorSettingFormData
        ] = formDataValue as never
      }
    })

    const { x_ad } = creatorSettingsFormData
    if (!creatorSettings.is_partner && x_ad !== undefined) creatorSettingsFormData.fee = x_ad ? 5 : 7

    if (!Object.keys(creatorSettingsFormData)?.length) return

    mutate({ creatorSettingsFormData }, {
      onError: () => { setValidateError('잠시 후 다시 시도해주세요') },
      onSuccess: () => {
        setCreatorSettings({ ...creatorSettings, ...creatorSettingsFormData })
        setValidateError('')
        setSaveMessage('저장 완료')
        setTimeout(() => { setSaveMessage('') }, 1500)
      },
    })
  }

  return (
    <form className={styles.form}>
      {!isPending || <IsLoading />}
      <div className={styles.fee}>
        <p className={styles.feeLabel}>
          <span className={styles.hide}>{'중개 '}</span>
          {`수수료: ${Number(creatorSettings.fee).toFixed(1)}%`}
        </p>
        <div className={styles.commentContainer}>
          {!creatorSettings.is_partner && !creatorSettings.x_ad && (
            <p className={styles.comment}>
              * 하단의 수수료 혜택 체크시 5.0%의 수수료로 이용하실 수 있습니다.
            </p>
          )}
          <p className={styles.comment}>
            * 작업 완료 시점과 관계 없이, 요청 당시의 중개 수수료가 적용됩니다.
          </p>
        </div>
      </div>
      <hr className={styles.hr} />
      <CommonCheckboxInput
        label="수수료 혜택"
        name="x_ad"
        checked={creatorInput.x_ad}
        disabled={!xLink}
        onChange={handleChange}
        comment={(!xLink) ? '* 프로필에 X 링크를 등록해야합니다.' : `* X 자기소개에 (commicat.com/@${englishNickname})를 입력 후 체크해주세요.`}
      />
      <CommonCheckboxInput
        label="요청 모집"
        name="seek_request"
        checked={creatorInput.seek_request}
        onChange={handleChange}
        comment="* 요청을 모집할 수 있습니다."
      />
      <CommonCheckboxInput
        label="외주 허용"
        name="allow_copyright_transfer"
        checked={creatorInput.allow_copyright_transfer}
        onChange={handleChange}
        comment="* 저작재산권을 이관하는 외주 요청을 허용합니다."
      />
      <CommonCheckboxInput
        label="비공개 허용"
        name="allow_hidden"
        checked={creatorInput.allow_hidden}
        onChange={handleChange}
        comment="* 외부에 공개되지 않는 비공개 요청을 허용합니다."
      />
      {!creatorInput.allow_hidden || (
        <CommonCheckboxInput
          label="비공개만 허용"
          name="allow_hidden_only"
          checked={creatorInput.allow_hidden_only}
          onChange={handleChange}
          comment="* 비공개 요청만 허용합니다."
        />
      )}
      <CommonCheckboxInput
        label="익명 허용"
        name="allow_anonymous"
        checked={creatorInput.allow_anonymous}
        onChange={handleChange}
        comment="* 클라이언트가 공개되지 않는 익명 요청을 허용합니다."
      />
      <div className={styles.container}>
        <div className={styles.label}>DM 허용</div>
        <div className={styles.inputContainer}>
          <Select
            className={styles.select}
            name="allow_dm"
            options={ALLOW_DM_OPTIONS}
            value={dmOption}
            onChange={handleAllowDmChange}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>포트폴리오</div>
        <Link className={styles.link} target="_blank" href="/edit-portfolio" prefetch={false}>
          {!creatorSettings.portfolio ? '작성(선택 사항)' : '수정'}
        </Link>
      </div>
      <hr className={styles.hr} />
      <p className={styles.genreLabel}>이미지</p>
      <Select
        className={styles.select}
        isMulti
        name="image_category"
        options={IMAGE_CATEGORY}
        value={imageOptions}
        onChange={(options) => { setImageOptions(options) }}
      />
      {!imageOptions.length || (
        <>
          <CommonInput
            label="최소 금액"
            name="min_amount_image"
            value={creatorInput.min_amount_image || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 최소 금액입니다. (10,000원 이상)"
          />
          <CommonInput
            label="응답 기한"
            name="response_expiration_days_image"
            value={creatorInput.response_expiration_days_image || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 승인/거절 응답 기한입니다."
          />
          <CommonInput
            label="작업 완료 기한"
            name="complete_expiration_days_image"
            value={creatorInput.complete_expiration_days_image || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment={'* 작업 요청을 완료할 수 있는 최대 일 수입니다.\n* 요청의 결제 완료 시점부터 계산되며 기한을 넘기면 요청은 자동으로 취소됩니다.'}
          />
        </>
      )}
      <hr className={styles.hr} />
      <p className={styles.genreLabel}>오디오</p>
      <Select
        className={styles.select}
        isMulti
        name="audio_category"
        options={AUDIO_CATEGORY}
        value={audioOptions}
        onChange={(options) => { setAudioOptions(options) }}
      />
      {!audioOptions.length || (
        <>
          <CommonInput
            label="최소 금액"
            name="min_amount_audio"
            value={creatorInput.min_amount_audio || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 최소 금액입니다. (10,000원 이상)"
          />
          <CommonInput
            label="응답 기한"
            name="response_expiration_days_audio"
            value={creatorInput.response_expiration_days_audio || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 승인/거절 응답 기한입니다."
          />
          <CommonInput
            label="작업 완료 기한"
            name="complete_expiration_days_audio"
            value={creatorInput.complete_expiration_days_audio || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment={'* 작업 요청을 완료할 수 있는 최대 일 수입니다.\n* 요청의 결제 완료 시점부터 계산되며 기한을 넘기면 요청은 자동으로 취소됩니다.'}
          />
        </>
      )}
      <hr className={styles.hr} />
      <p className={styles.genreLabel}>비디오</p>
      <Select
        className={styles.select}
        isMulti
        name="video_category"
        options={VIDEO_CATEGORY}
        value={videoOptions}
        onChange={(options) => { setVideoOptions(options) }}
      />
      {!videoOptions.length || (
        <>
          <CommonInput
            label="최소 금액"
            name="min_amount_video"
            value={creatorInput.min_amount_video || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 최소 금액입니다. (10,000원 이상)"
          />
          <CommonInput
            label="응답 기한"
            name="response_expiration_days_video"
            value={creatorInput.response_expiration_days_video || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 승인/거절 응답 기한입니다."
          />
          <CommonInput
            label="작업 완료 기한"
            name="complete_expiration_days_video"
            value={creatorInput.complete_expiration_days_video || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment={'* 작업 요청을 완료할 수 있는 최대 일 수입니다.\n* 요청의 결제 완료 시점부터 계산되며 기한을 넘기면 요청은 자동으로 취소됩니다.'}
          />
        </>
      )}
      <hr className={styles.hr} />
      <p className={styles.genreLabel}>텍스트</p>
      <Select
        className={styles.select}
        isMulti
        name="text_category"
        options={TEXT_CATEGORY}
        value={textOptions}
        onChange={(options) => { setTextOptions(options) }}
      />
      {!textOptions.length || (
        <>
          <CommonInput
            label="최소 금액"
            name="min_amount_text"
            value={creatorInput.min_amount_text || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 최소 금액입니다. (10,000원 이상)"
          />
          <CommonInput
            label="응답 기한"
            name="response_expiration_days_text"
            value={creatorInput.response_expiration_days_text || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 승인/거절 응답 기한입니다."
          />
          <CommonInput
            label="작업 완료 기한"
            name="complete_expiration_days_text"
            value={creatorInput.complete_expiration_days_text || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment={'* 작업 요청을 완료할 수 있는 최대 일 수입니다.\n* 요청의 결제 완료 시점부터 계산되며 기한을 넘기면 요청은 자동으로 취소됩니다.'}
          />
        </>
      )}
      <hr className={styles.hr} />
      <p className={styles.genreLabel}>기타</p>
      <Select
        className={styles.select}
        isMulti
        name="other_category"
        options={OTHER_CATEGORY}
        value={otherOptions}
        onChange={(options) => { setOtherOptions(options) }}
      />
      {!otherOptions.length || (
        <>
          <CommonInput
            label="최소 금액"
            name="min_amount_other"
            value={creatorInput.min_amount_other || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 최소 금액입니다. (10,000원 이상)"
          />
          <CommonInput
            label="응답 기한"
            name="response_expiration_days_other"
            value={creatorInput.response_expiration_days_other || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment="* 요청의 승인/거절 응답 기한입니다."
          />
          <CommonInput
            label="작업 완료 기한"
            name="complete_expiration_days_other"
            value={creatorInput.complete_expiration_days_other || ''}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            comment={'* 작업 요청을 완료할 수 있는 최대 일 수입니다.\n* 요청의 결제 완료 시점부터 계산되며 기한을 넘기면 요청은 자동으로 취소됩니다.'}
          />
        </>
      )}
      <div className={styles.buttonContainer}>
        <span className={styles.error}>{validateError}</span>
        <p className={styles.saveMessage}>{saveMessage}</p>
        <button className={styles.button} type="button" disabled={!!isPending} onClick={handleSubmit}>저장</button>
        <button className={styles.button} type="button" disabled={!!isPending} onClick={handleReset}>초기화</button>
      </div>
    </form>
  )
}

export default CreatorSettingForm
