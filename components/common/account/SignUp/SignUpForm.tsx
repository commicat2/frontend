'use client'

import { useRef, useState } from 'react'
import { useSignUp } from 'lib/api/queryHooks'
import { isValidEmail, isValidPassword } from 'lib/utils/validators'
import IsLoading from 'components/common/IsLoading'
import AccountInput from 'components/common/AccountInput'
import Button from 'components/common/Button'
import Link from 'next/link'
import styles from './SignUpForm.module.css'

const SignUpForm = ({ setEmail }: SetEmail) => {
  const { mutate, isPending } = useSignUp()
  const email = useRef('')
  const password = useRef('')
  const password2 = useRef('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [validateError, setValidateError] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    email.current = e.target.email?.value || ''
    password.current = e.target.password?.value || ''
    password2.current = e.target.password2?.value || ''
    if (!isValidEmail(email.current)) setValidateError('올바른 이메일 형식이 아닙니다.')
    else if (password.current !== password2.current) setValidateError('비밀번호가 일치하지 않습니다.')
    else if (!isValidPassword(password.current)) setValidateError('비밀번호는 영문, 숫자, 특수 문자 조합 8자 이상을 입력해 주세요.')
    else if (!isChecked) setValidateError('이용 약관과 개인정보 처리 방침에 동의해주세요.')
    else {
      mutate({ email: email.current, password: password.current }, {
        onError: (error) => { setValidateError(error.response?.data?.message || '이메일과 비밀번호를 확인해주세요.') },
        onSuccess: () => { setEmail(email.current) },
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'email':
        email.current = value
        break
      case 'password':
        password.current = value
        break
      case 'password2':
        password2.current = value
        break
      default:
        break
    }
    if (email.current && !isValidEmail(email.current)) setValidateError('올바른 이메일 형식이 아닙니다.')
    else if (password.current && password2.current && password.current !== password2.current) setValidateError('비밀번호가 일치하지 않습니다.')
    else if (password.current && !isValidPassword(password.current)) setValidateError('비밀번호는 영문, 숫자, 특수 문자 조합 8자 이상을 입력해 주세요.')
    else setValidateError('')
  }

  const toggleShowPassword = (e: React.MouseEvent) => { e.preventDefault(); setShowPassword((prev) => { return !prev }) }
  const toggleshowPassword2 = (e: React.MouseEvent) => { e.preventDefault(); setShowPassword2((prev) => { return !prev }) }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => { setIsChecked(e.target.checked) }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isPending || <IsLoading />}
      <p className={styles.error}>{validateError}</p>
      <AccountInput
        value="email"
        type="email"
        onBlur={handleBlur}
        autoComplete="off"
      />
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
      <div className={styles.agreementContainer}>
        <input
          className={styles.checkBox}
          type="checkbox"
          name="agreement"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className={styles.agreementText}>
          <Link className={styles.link} target="_blank" href="/terms" prefetch={false}>이용 약관</Link>
          {'과 '}
          <Link className={styles.link} target="_blank" href="/privacy" prefetch={false}>개인정보 처리 방침</Link>
          에 동의합니다.
        </span>
      </div>
      <Button type="submit" disabled={!!isPending}>회원가입</Button>
    </form>
  )
}

export default SignUpForm
