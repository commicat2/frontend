'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CommonInput from 'components/common/CommonInput'
import IsLoading from 'components/common/IsLoading'
import Modal from 'components/common/Modal'
import RegisterCreatorModal from 'components/common/Modal/RegisterCreatorModal'
import { sendEmailVerification } from 'lib/api/queryFunctions'
import { useUpdateAccountSettings } from 'lib/api/queryHooks'
import { isValidEmail } from 'lib/utils/validators'
import styles from './AccountSettingForm.module.css'

const AccountSettingForm = ({
  userId, accountSettings, setAccountSettings, englishNickname,
}: {
  userId: number, accountSettings: AccountSettings, setAccountSettings: SetState<AccountSettings>, englishNickname: string
}) => {
  const { mutate, isPending } = useUpdateAccountSettings()
  const [accountInput, setAccountInput] = useState<AccountSettings>({ ...accountSettings })
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false)
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [validateError, setValidateError] = useState('')
  const [registerCreatorModalOpen, setRegisterCreatorModalOpen] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)

  useEffect(() => { setAccountInput({ ...accountSettings }) }, [accountSettings])

  const handleReset = () => { setAccountInput({ ...accountSettings }); setEmailChanged(false); setValidateError('') }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setAccountInput((prev) => { return { ...prev, [e.target.name]: e.target.value, allow_send_email: false } })
      setEmailChanged(true)
    } else if (e.target.type === 'checkbox') setAccountInput((prev) => { return { ...prev, [e.target.name]: e.target.checked } })
    else setAccountInput({ ...accountInput, [e.target.name]: e.target.value })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email' && value !== '' && !isValidEmail(value)) setValidateError('올바른 이메일 형식이 아닙니다.')
    else setValidateError('')
  }

  const handleSubmit = () => {
    const accountSettingsFormData: AccountSettingFormData = {}
    if (accountInput.email && accountInput.email !== accountSettings.email) accountSettingsFormData.email = accountInput.email
    if (accountInput.allow_send_email !== accountSettings.allow_send_email) accountSettingsFormData.allow_send_email = accountInput.allow_send_email
    if (accountInput.bank_account_name !== accountSettings.bank_account_name) accountSettingsFormData.bank_account_name = accountInput.bank_account_name || ''
    if (accountInput.bank_account_bank_name !== accountSettings.bank_account_bank_name) accountSettingsFormData.bank_account_bank_name = accountInput.bank_account_bank_name || ''
    if (accountInput.bank_account_number !== accountSettings.bank_account_number) accountSettingsFormData.bank_account_number = accountInput.bank_account_number || ''
    if (!Object.keys(accountSettingsFormData)?.length) return

    mutate({ accountSettingsFormData }, {
      onError: (error) => {
        setValidateError(error.response?.data?.email || '잠시 후 다시 시도해주세요.')
      },
      onSuccess: () => {
        if (accountSettingsFormData.email) setAccountSettings({ ...accountSettings, ...accountSettingsFormData, is_verified: false })
        else setAccountSettings({ ...accountSettings, ...accountSettingsFormData })
        setValidateError('')
        setSaveMessage('저장 완료')
        setTimeout(() => { setSaveMessage('') }, 1500)
      },
    })
  }

  const handleSave = () => {
    if (accountSettings.auth_provider === 'email') setIsCheckModalOpen(true)
    else handleSubmit()
  }

  const handleSendEmailVerification = async () => {
    setIsVerifyModalOpen(true)
    await sendEmailVerification({ email: accountSettings.email })
  }

  const renderEmailVerification = () => {
    if (accountSettings.is_verified) return <div className={styles.verified}><Image fill sizes="100%" src="/icon-verified.png" alt="Verified" /></div>
    return (
      <div className={styles.row}>
        <div className={styles.verified}><Image fill sizes="100%" src="/icon-not-verified.png" alt="Not Verified" /></div>
        <button className={styles.settingButton} type="button" onClick={handleSendEmailVerification}>인증하기</button>
      </div>
    )
  }

  return (
    <>
      {isPending && <IsLoading />}
      <form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.label}>이메일</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              id="email"
              name="email"
              value={accountInput.email || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={100}
              disabled={accountSettings.auth_provider !== 'email'}
            />
          </div>
          <span className={styles.comment}>{renderEmailVerification()}</span>
        </div>
        {!accountSettings.is_verified || (
        <div className={styles.container}>
          <input
            className={styles.checkBox}
            type="checkbox"
            name="allow_send_email"
            checked={accountInput.allow_send_email || false}
            onChange={handleChange}
            disabled={emailChanged}
          />
          <span className={styles.checkBoxComment}>작업/결제 관련 알림 메일로도 받기</span>
        </div>
        )}
        {accountSettings.auth_provider !== 'email' || (
          <div className={styles.container}>
            <div className={styles.label}>비밀번호</div>
            <div className={styles.settingButton}>
              <Link href="/forgot-password" target="_blank">비밀번호 변경하기</Link>
            </div>
          </div>
        )}
        {!accountSettings.is_creator && (
          <div className={styles.container}>
            <div className={styles.label}>크리에이터</div>
            <button
              className={!englishNickname || !accountSettings.is_verified ? styles.settingButtonDisabled : styles.settingButton}
              type="button"
              disabled={!englishNickname || !accountSettings.is_verified}
              onClick={() => { setRegisterCreatorModalOpen(true) }}
            >
              크리에이터로 등록하기
            </button>
            {!englishNickname && <p className={styles.comment}>* 닉네임을 먼저 설정해주세요.</p>}
            {(englishNickname && !accountSettings.is_verified) && <p className={styles.comment}>* 이메일 인증을 완료해주세요.</p>}
          </div>
        )}
        <p className={styles.accountInfo}>계좌 정보는 클라이언트 입금, 환불 그리고 크리에이터 대금 지급 시 이용됩니다.</p>
        <CommonInput
          label="예금주명"
          name="bank_account_name"
          value={accountInput.bank_account_name || ''}
          onChange={handleChange}
          maxLength={20}
        />
        <CommonInput
          label="은행이름"
          name="bank_account_bank_name"
          value={accountInput.bank_account_bank_name || ''}
          onChange={handleChange}
          maxLength={20}
        />
        <CommonInput
          label="계좌번호"
          name="bank_account_number"
          value={accountInput.bank_account_number || ''}
          onChange={handleChange}
          maxLength={50}
        />
        <div className={styles.buttonContainer}>
          <span className={styles.error}>{validateError}</span>
          <p className={styles.saveMessage}>{saveMessage}</p>
          <button className={styles.button} type="button" onClick={handleSave}>저장</button>
          <button className={styles.button} type="button" onClick={handleReset}>초기화</button>
        </div>
      </form>
      <div className={styles.disableAccount}>
        <div className={styles.settingButton}>
          <Link href="disable-account/" target="_blank">계정 비활성화</Link>
        </div>
      </div>
      {!isCheckModalOpen || (
        <Modal
          option="passwordCheck"
          closeModal={() => { setIsCheckModalOpen(false) }}
          returnResult={handleSubmit}
        />
      )}
      {!isVerifyModalOpen || (
        <Modal
          title="이메일 인증"
          content={`${accountSettings.email}로 전송된 링크를 통해 이메일 인증을 완료해주세요.`}
          option="common"
          closeModal={() => { setIsVerifyModalOpen(false) }}
        />
      )}
      {!registerCreatorModalOpen || (
        <RegisterCreatorModal
          userId={userId}
          closeModal={() => { setRegisterCreatorModalOpen(false) }}
          returnResult={() => { window.location.reload() }}
        />
      )}
    </>
  )
}

export default AccountSettingForm
