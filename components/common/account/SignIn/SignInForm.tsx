'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSignIn } from 'lib/api/queryHooks'
import { isValidEmail, isValidPassword } from 'lib/utils/validators'
import IsLoading from 'components/common/IsLoading'
import AccountInput from 'components/common/AccountInput'
import Button from 'components/common/Button'
import styles from './SignInForm.module.css'

const SignInForm = ({ setIsFirstSignIn }: { setIsFirstSignIn: SetState<boolean> }) => {
  const { mutate, isPending } = useSignIn()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [validateError, setValidateError] = useState('')

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    const email = e.target.email?.value || ''
    const password = e.target.password?.value || ''
    if (!isValidEmail(email) || !isValidPassword(password)) setValidateError('이메일과 비밀번호를 확인해주세요.')
    else {
      mutate({ email, password }, {
        onError: (error) => { setValidateError(error.response?.data?.message || '이메일과 비밀번호를 확인해주세요.') },
        onSuccess: (data) => {
          localStorage.setItem('jas', JSON.stringify(data.jas))
          localStorage.setItem('ecs', JSON.stringify(data.ecs))
          if (data.is_registered) router.push('/')
          else setIsFirstSignIn(true)
        },
      })
    }
  }

  const toggleShowPassword = (e: React.MouseEvent) => { e.preventDefault(); setShowPassword((prev) => { return !prev }) }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!isPending || <IsLoading />}
      <p className={styles.error}>{validateError}</p>
      <AccountInput value="email" type="email" />
      <AccountInput value="password" toggleShowPassword={toggleShowPassword} type={showPassword ? 'text' : 'password'} />
      <Button type="submit" disabled={!!isPending}>로그인</Button>
    </form>
  )
}

export default SignInForm
