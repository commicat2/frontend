import AccountLogo from 'components/common/AccountLogo'
import DirectSettings from 'components/common/account/DirectSettings'
import SignUpDone from './SignUpDone'
import SignUpHeader from './SignUpHeader'
import SignUpForm from './SignUpForm'

const SignUp = ({
  email, setEmail, isFirstSignIn, setShowSignIn,
}: Email & SetEmail & { isFirstSignIn?: boolean, setShowSignIn: SetState<boolean> }) => {
  const renderContent = () => {
    if (isFirstSignIn) return <DirectSettings />
    if (email) return <SignUpDone email={email} setEmail={setEmail} setShowSignIn={setShowSignIn} />
    return (
      <>
        <SignUpHeader setShowSignIn={setShowSignIn} />
        <SignUpForm setEmail={setEmail} />
      </>
    )
  }

  return (
    <>
      <AccountLogo />
      {renderContent()}
    </>
  )
}

export default SignUp
