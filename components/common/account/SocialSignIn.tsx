'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useSignInWithGoogle } from 'lib/api/queryHooks'
import IsLoading from 'components/common//IsLoading'
import styles from './SocialSignIn.module.css'

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id?: string
            callback: (response: GoogleSignInResponse) => void
          }) => void
          renderButton: (element: HTMLElement | null, options: unknown) => void
        }
      }
    }
  }
}

const loadGoogleScript = (callback: () => void) => {
  const existingScript = document.getElementById('googleSignInScript')
  if (existingScript) { callback(); return }
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = callback
  script.id = 'googleSignInScript'
  document.body.appendChild(script)
}

const SocialSignIn = ({ setIsFirstSignIn }: { setIsFirstSignIn: SetState<boolean> }) => {
  const { mutate, isPending } = useSignInWithGoogle()
  const router = useRouter()
  const [validateError, setValidateError] = useState('')

  const handleSignUpWithGoogle = useCallback((response: GoogleSignInResponse) => {
    setValidateError('')
    const access = response?.credential
    if (!access) setValidateError('잠시 후 다시 시도해주세요.')
    else {
      mutate({ access }, {
        onError: (error) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
        onSuccess: (data) => {
          localStorage.setItem('jas', JSON.stringify(data.jas))
          localStorage.setItem('ecs', JSON.stringify(data.ecs))
          if (data.is_registered) router.push('/')
          else setIsFirstSignIn(true)
        },
      })
    }
  }, [mutate, router, setIsFirstSignIn])

  useEffect(() => {
    loadGoogleScript(() => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleSignUpWithGoogle,
      })
      window.google?.accounts.id.renderButton(
        document.getElementById('googleSignIn'),
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'circle',
          width: '360',
        },
      )
    })
  }, [handleSignUpWithGoogle])

  return (
    <div className={styles.container}>
      {!isPending || <IsLoading />}
      <p className={styles.error}>{validateError}</p>
      <div id="googleSignIn" />
    </div>
  )
}

export default SocialSignIn
