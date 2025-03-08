'use client'

import { useRef, useState } from 'react'
import { useUpdatePassword } from 'lib/api/queryHooks'
import { isValidPassword } from 'lib/utils/validators'
import IsLoading from 'components/common/IsLoading'
import AccountInput from 'components/common/AccountInput'
import Button from 'components/common/Button'
import styles from './UpdatePasswordForm.module.css'

const UpdatePasswordForm = ({ uidb64, token, setIsPasswordUpdated }: UidbSlugs & { setIsPasswordUpdated: SetState<boolean> }) => {
  const { mutate, isPending } = useUpdatePassword()
  const password = useRef('')
  const password2 = useRef('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [validateError, setValidateError] = useState('')

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    password.current = e.target.password?.value || ''
    password2.current = e.target.password2?.value || ''
    if (password.current !== password2.current) setValidateError('비밀번호가 일치하지 않습니다.')
    else if (!isValidPassword(password.current)) setValidateError('비밀번호는 영문, 숫자, 특수문자 조합 8자 이상을 입력해 주세요.')
    else {
      mutate({ password: password.current, uidb64, token }, {
        onError: (error) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
        onSuccess: () => { setIsPasswordUpdated(true) },
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'password') password.current = value
    else if (name === 'password2') password2.current = value

    if (password.current !== '' && password2.current !== '' && password.current !== password2.current) setValidateError('비밀번호가 일치하지 않습니다.')
    else if (password.current !== '' && !isValidPassword(password.current)) setValidateError('비밀번호는 영문, 숫자, 특수문자 조합 8자 이상을 입력해 주세요.')
    else setValidateError('')
  }

  const toggleShowPassword = (e: React.MouseEvent) => { e.preventDefault(); setShowPassword((prev) => { return !prev }) }
  const toggleshowPassword2 = (e: React.MouseEvent) => { e.preventDefault(); setShowPassword2((prev) => { return !prev }) }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isPending || <IsLoading />}
      <p className={styles.error}>{validateError}</p>
      <AccountInput
        value="password"
        toggleShowPassword={toggleShowPassword}
        type={showPassword ? 'text' : 'password'}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <AccountInput
        value="password"
        isPassword2
        toggleShowPassword={toggleshowPassword2}
        type={showPassword2 ? 'text' : 'password'}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <Button type="submit" disabled={!!isPending}>비밀번호 변경하기</Button>
    </form>
  )
}

export default UpdatePasswordForm
