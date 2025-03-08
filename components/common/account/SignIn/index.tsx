'use client'

import AccountLogo from 'components/common/AccountLogo'
import DirectSettings from 'components/common/account/DirectSettings'
import SignInHeader from './SignInHeader'
import SignInForm from './SignInForm'
import ForgotPasswordLink from './ForgotPasswordLink'

const SignIn = ({ isFirstSignIn, setIsFirstSignIn, setShowSignIn }: {
  isFirstSignIn: boolean, setIsFirstSignIn: SetState<boolean>, setShowSignIn: SetState<boolean>
}) => {
  return (
    <>
      <AccountLogo />
      {isFirstSignIn ? <DirectSettings /> : (
        <>
          <SignInHeader setShowSignIn={setShowSignIn} />
          <SignInForm setIsFirstSignIn={setIsFirstSignIn} />
          <ForgotPasswordLink />
        </>
      )}
    </>
  )
}

export default SignIn
