'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetUserSettings } from 'lib/api/queryHooks'
import Nav from 'components/common/Nav'
import Footer from 'components/common/Footer'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import MainContainerButton from 'components/common/MainContainerButton'
import ProfileSettingForm from './ProfileSettingForm'
import AccountSettingForm from './AccountSettingForm'
import CreatorSettingForm from './CreatorSettingForm'

const SettingsMain = () => {
  const { refetch, isError } = useGetUserSettings()
  const router = useRouter()
  const [userId, setUserId] = useState(0)
  const [profileSettings, setProfileSettings] = useState({} as ProfileSettings)
  const [accountSettings, setAccountSettings] = useState({} as AccountSettings)
  const [creatorSettings, setCreatorSettings] = useState({} as CreatorSettings)
  const [option, setOption] = useState('profile')
  const [rerenderNav, setRerenderNav] = useState(false)
  const [isCreator, setIsCreator] = useState(false)

  useEffect(() => {
    const handleRefetch = async () => {
      const { data } = await refetch()
      if (!data) return
      const {
        id, creator_profile, profile, ...rest
      } = data
      setUserId(id)
      setProfileSettings({ ...profile })
      setAccountSettings({ ...rest })
      setIsCreator(rest.is_creator)
      if (creator_profile) setCreatorSettings({ ...creator_profile })
    }

    if (!localStorage.getItem('jas') || isError) router.push('/sign-in')
    else { setRerenderNav(true); handleRefetch() }
  }, [refetch, isError, router])

  const renderForm = () => {
    switch (option) {
      case 'account':
        return (
          <AccountSettingForm
            userId={userId}
            accountSettings={accountSettings}
            setAccountSettings={setAccountSettings}
            englishNickname={profileSettings.english_nickname || ''}
          />
        )
      case 'creator':
        return (
          <CreatorSettingForm
            creatorSettings={creatorSettings}
            setCreatorSettings={setCreatorSettings}
            xLink={profileSettings.x_link || ''}
            englishNickname={profileSettings.english_nickname || ''}
          />
        )
      default:
        return (
          <ProfileSettingForm
            profileSettings={profileSettings}
            setProfileSettings={setProfileSettings}
            setRerenderNav={setRerenderNav}
          />
        )
    }
  }

  return (
    <>
      <Nav rerenderNav={rerenderNav} setRerenderNav={setRerenderNav} />
      <main>
        <MainContainer>
          <MainContainerHeader>
            <MainContainerButton
              selected={option === 'profile'}
              disabled={option === 'profile'}
              onClick={() => { setOption('profile') }}
            >
              프로필
            </MainContainerButton>
            <MainContainerButton
              selected={option === 'account'}
              disabled={option === 'account'}
              onClick={() => { setOption('account') }}
            >
              계정
            </MainContainerButton>
            {isCreator && (
              <MainContainerButton
                selected={option === 'creator'}
                disabled={option === 'creator'}
                onClick={() => { setOption('creator') }}
              >
                크리에이터
              </MainContainerButton>
            )}
          </MainContainerHeader>
          {renderForm()}
        </MainContainer>
      </main>
      <Footer />
    </>
  )
}

export default SettingsMain
