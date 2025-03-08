import EyeToggler from 'components/common/EyeToggler'
import styles from './AccountInput.module.css'

const AccountInput = ({
  value, isPassword2 = false, toggleShowPassword, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string, isPassword2?: boolean, toggleShowPassword?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  const name = isPassword2 ? `${value}2` : `${value}`
  const label = value === 'email' ? '이메일' : '비밀번호'
  const placeholder = value === 'email' ? '이메일을 입력해주세요.' : `비밀번호${isPassword2 ? ' 확인' : ''}`
  const autoComplete = value === 'email' ? 'email' : 'current-password'
  const maxLength = value === 'email' ? 255 : 128

  return (
    <>
      <label className={styles.accountLabel} htmlFor={name}>
        {label}
        {!isPassword2 || ' 확인'}
      </label>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.accountInput} ${value !== 'email' ? styles.passwordInput : ''}`}
          id={name}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          {...props}
        />
        {value === 'password' && <EyeToggler onMouseDown={toggleShowPassword} />}
      </div>
    </>
  )
}

export default AccountInput
