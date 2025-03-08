import {
  useMemo, useLayoutEffect, useRef, useState,
} from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import IsLoading from 'components/common/IsLoading'
import CommonCheckboxInput from 'components/common/CommonCheckboxInput'
import Modal from 'components/common/Modal'
import { useGetBankInfo, useCreateRequest } from 'lib/api/queryHooks'
import { categoryToNumberOptions, formatNumber } from 'lib/utils/common'
import ConfirmModal from './ConfirmModal'
import styles from './CreateRequestForm.module.css'

const CreateRequestForm = ({
  id, firstGenre, allowGenres, creatorProfile, setCreateRequest, setSuccessMessage, setErrorMessage,
}: {
  id: number
  firstGenre: Genre
  allowGenres: Readonly<SelectOption<GenreNumber, GenreKr>[]>
  creatorProfile: CreatorSettings
  setCreateRequest: SetState<boolean>
  setSuccessMessage: SetState<string>
  setErrorMessage: SetState<string>
}) => {
  let firstGenreOption: SelectOption<GenreNumber, GenreKr>
  switch (firstGenre) {
    case 'image':
      firstGenreOption = { value: 1, label: '이미지' }
      break
    case 'audio':
      firstGenreOption = { value: 2, label: '오디오' }
      break
    case 'video':
      firstGenreOption = { value: 3, label: '비디오' }
      break
    case 'text':
      firstGenreOption = { value: 4, label: '텍스트' }
      break
    case 'other':
      firstGenreOption = { value: 5, label: '기타' }
      break
    default:
      firstGenreOption = { value: 1, label: '이미지' }
      break
  }

  const { refetch } = useGetBankInfo()
  const { mutate, isPending } = useCreateRequest(id)
  const [showForm, setShowForm] = useState(false)
  const [genre, setGenre] = useState<SelectOption<GenreNumber, GenreKr>>(firstGenreOption)
  const [allowCategories, setAllowCategories] = useState<SelectOption<CategoryNumber, Category>[]>([])
  const [category, setCategory] = useState<SelectOption<CategoryNumber, Category>>({ value: 0, label: 'Select...' })
  const minAmount = useRef(0)
  const bankAccount = useRef<string[]>([])
  const authProvider = useRef<string>('email')
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [amount, setAmount] = useState<string>('10,000원')
  const [requestInput, setRequestInput] = useState<RequestInput>({
    copyrightTransfer: false,
    hidden: false,
    anonymous: false,
  })
  const [validateError, setValidateError] = useState('')
  const [isPaswordCheckModalOpen, setIsPasswordCheckModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  useLayoutEffect(() => {
    const handleRefetch = async () => {
      const { data, isFetching, error } = await refetch()
      if (error) { setErrorMessage(error.response?.data?.message || '잠시 후 다시 시도해주세요'); return }
      if (!data || isFetching) return
      const {
        is_verified,
        is_registered,
        auth_provider,
        bank_account_name,
        bank_account_bank_name,
        bank_account_number,
      } = data

      if (!is_verified) { setErrorMessage('이메일 인증을 완료해주세요.'); return }
      if (!is_registered) { setErrorMessage('프로필을 설정해주세요.'); return }
      if (!bank_account_name || !bank_account_bank_name || !bank_account_number) {
        setErrorMessage('계좌 정보를 등록해주세요.')
        return
      }
      bankAccount.current = [bank_account_name, bank_account_bank_name, bank_account_number]
      authProvider.current = auth_provider
      setShowForm(true)
    }

    handleRefetch()
  }, [refetch, setErrorMessage])

  const handleGenreChange = (
    newValue: SingleValue<SelectOption<GenreNumber, GenreKr>>,
    actionMeta: ActionMeta<SelectOption<GenreNumber, GenreKr>>,
  ) => {
    if (actionMeta.action === 'select-option' && newValue) {
      setGenre({ value: newValue.value, label: newValue.label })
      setValidateError('')
    }
  }

  const handleCategoryChange = (
    newValue: SingleValue<SelectOption<CategoryNumber, Category>>,
    actionMeta: ActionMeta<SelectOption<CategoryNumber, Category>>,
  ) => {
    if (actionMeta.action === 'select-option' && newValue) {
      setCategory({ value: newValue.value, label: newValue.label })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setRequestInput((prev) => { return { ...prev, [name]: checked } })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    let validatedValue = ''
    const validatedNumber = Number(value) - (Number(value) % 1000)
    if (Number.isNaN(validatedNumber)) {
      validatedValue = `${formatNumber(minAmount.current)}원`
      setValidateError('숫자를 입력해주세요.')
    } else if (validatedNumber < minAmount.current) {
      validatedValue = `${formatNumber(minAmount.current)}원`
      setValidateError('최소 금액 이상을 입력해주세요.')
    } else {
      validatedValue = `${formatNumber(validatedNumber)}원`
      setValidateError('')
    }
    setAmount(validatedValue)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAmount(e.target.value.replace(/[^0-9]/g, ''))
  }

  useLayoutEffect(() => {
    if (!genre.value || !creatorProfile) return
    let categories: string[] = []
    let selectedGenre: Genre = 'image'
    let tempAmount: number
    switch (genre.value) {
      case 1:
        categories = creatorProfile.allow_image_category
        tempAmount = creatorProfile.min_amount_image || 10000
        minAmount.current = tempAmount
        setAmount(`${formatNumber(Number(tempAmount) - (Number(tempAmount) % 1000))}원`)
        break
      case 2:
        categories = creatorProfile.allow_audio_category
        selectedGenre = 'audio'
        tempAmount = creatorProfile.min_amount_audio || 10000
        minAmount.current = tempAmount
        setAmount(`${formatNumber(Number(tempAmount) - (Number(tempAmount) % 1000))}원`)
        break
      case 3:
        categories = creatorProfile.allow_video_category
        selectedGenre = 'video'
        tempAmount = creatorProfile.min_amount_video || 10000
        minAmount.current = tempAmount
        setAmount(`${formatNumber(Number(tempAmount) - (Number(tempAmount) % 1000))}원`)
        break
      case 4:
        categories = creatorProfile.allow_text_category
        selectedGenre = 'text'
        tempAmount = creatorProfile.min_amount_text || 10000
        minAmount.current = tempAmount
        setAmount(`${formatNumber(Number(tempAmount) - (Number(tempAmount) % 1000))}원`)
        break
      case 5:
        categories = creatorProfile.allow_other_category
        selectedGenre = 'other'
        tempAmount = creatorProfile.min_amount_other || 10000
        minAmount.current = tempAmount
        setAmount(`${formatNumber(Number(tempAmount) - (Number(tempAmount) % 1000))}원`)
        break
      default:
        break
    }

    setCategory({ value: 0, label: 'Select...' })
    setAllowCategories(categoryToNumberOptions({ categories, genre: selectedGenre }))
  }, [creatorProfile, genre.value])

  const inputNodes: React.ReactNode[] = useMemo(() => {
    if (!creatorProfile) return []
    const temp: React.ReactNode[] = []
    if (minAmount) {
      temp.push(
        <div className={styles.amountInputContainer} key="1">
          <div className={styles.amountLabel}>금액</div>
          <input
            className={styles.amountInput}
            id="amount"
            name="amount"
            value={amount}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            maxLength={15}
          />
        </div>,
      )
    }
    if (creatorProfile.allow_copyright_transfer) {
      temp.push(
        <CommonCheckboxInput
          key="2"
          label="외주"
          name="copyrightTransfer"
          checked={requestInput.copyrightTransfer}
          onChange={handleCheckboxChange}
          comment="* 저작재산권을 이관받습니다."
        />,
      )
    }
    if (creatorProfile.allow_hidden) {
      temp.push(
        <CommonCheckboxInput
          key="3"
          label="비공개"
          name="hidden"
          checked={!creatorProfile.allow_hidden_only ? requestInput.hidden : true}
          disabled={creatorProfile.allow_hidden_only}
          onChange={handleCheckboxChange}
          comment={
            !creatorProfile.allow_hidden_only
              ? '* 외부에 공개되지 않습니다.'
              : '* 외부에 공개되지 않는 요청만 허용됩니다.'
          }
        />,
      )
    }
    if (creatorProfile.allow_anonymous) {
      temp.push(
        <CommonCheckboxInput
          key="5"
          label="익명"
          name="anonymous"
          checked={requestInput.anonymous}
          onChange={handleCheckboxChange}
          comment="* 클라이언트가 공개되지 않습니다."
        />,
      )
    }
    return temp.filter(Boolean)
  }, [creatorProfile, requestInput, amount])

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    if (!e.target.amount || !contentRef.current) return
    e.target.amount.blur()
    if (!category.value) { setErrorMessage('카테고리를 선택해주세요.'); return }
    if (contentRef.current.value.length === 0) { setErrorMessage('요청 내용을 작성해주세요.'); return }
    if (authProvider.current === 'email') setIsPasswordCheckModalOpen(true)
    else setIsConfirmModalOpen(true)
  }

  const handleCreateRequest = () => {
    if (!contentRef.current || !creatorProfile) return
    let response_expiration_days: number
    let complete_expiration_days: number
    switch (genre.value) {
      case 1:
        response_expiration_days = creatorProfile.response_expiration_days_image
        complete_expiration_days = creatorProfile.complete_expiration_days_image
        break
      case 2:
        response_expiration_days = creatorProfile.response_expiration_days_audio
        complete_expiration_days = creatorProfile.complete_expiration_days_audio
        break
      case 3:
        response_expiration_days = creatorProfile.response_expiration_days_video
        complete_expiration_days = creatorProfile.complete_expiration_days_video
        break
      case 4:
        response_expiration_days = creatorProfile.response_expiration_days_text
        complete_expiration_days = creatorProfile.complete_expiration_days_text
        break
      case 5:
        response_expiration_days = creatorProfile.response_expiration_days_other
        complete_expiration_days = creatorProfile.complete_expiration_days_other
        break
      default:
        setErrorMessage('다시 시도해주세요.')
        return
    }

    if (!category.value) { setErrorMessage('카테고리를 선택해주세요.'); return }

    const numberAmount = Number(amount.replace(/[^0-9]/g, ''))
    const amount_excluding_fee = Math.ceil(numberAmount * (1 - (Number(creatorProfile.fee) / 100)))

    mutate({
      genre: genre.value,
      category: category.value.toString(36).toUpperCase(),
      content: contentRef.current.value,
      amount: numberAmount,
      amount_excluding_fee,
      copyright_transfer: !!requestInput.copyrightTransfer,
      hidden: !!requestInput.hidden,
      anonymous: !!requestInput.anonymous,
      status: 1,
      response_expiration_days,
      complete_expiration_days,
    }, {
      onError: (error) => { setErrorMessage(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => {
        setSuccessMessage('요청이 전달되었습니다.\n상단의 요청 아이콘을 통해 진행 상황을 확인하실 수 있습니다.')
        setCreateRequest(false)
      },
    })
  }

  return (
    <>
      {!isPending || <IsLoading />}
      {showForm && (
        <form className={styles.container} onSubmit={handleSubmit}>
          <Select
            className={styles.select}
            name="genre"
            options={allowGenres}
            value={genre}
            onChange={handleGenreChange}
          />
          <Select
            className={styles.select}
            name="category"
            options={allowCategories}
            value={category}
            onChange={handleCategoryChange}
          />
          <div className={styles.inputContainer}>
            <div className={styles.label}>내용</div>
            <textarea
              className={styles.contentInput}
              id="content"
              ref={contentRef}
              placeholder="요청 내용을 적어주세요."
              maxLength={1000}
            />
          </div>
          <p className={styles.error}>{validateError}</p>
          {inputNodes}
          <button className={styles.submitButton} type="submit">
            요청하기
          </button>
        </form>
      )}
      {isPaswordCheckModalOpen && (
        <Modal
          option="passwordCheck"
          closeModal={() => { setIsPasswordCheckModalOpen(false) }}
          returnResult={() => { setIsConfirmModalOpen(true) }}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          amount={amount}
          bankAccount={bankAccount.current}
          closeModal={() => { setIsConfirmModalOpen(false) }}
          returnResult={handleCreateRequest}
        />
      )}
    </>
  )
}

export default CreateRequestForm
