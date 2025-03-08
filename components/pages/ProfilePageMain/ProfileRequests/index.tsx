'use client'

import { useState } from 'react'
import MainContainerButton from 'components/common/MainContainerButton'
import MainContainerHeader from 'components/common/MainContainerHeader'
import Portfolio from './Portfolio'
import Works from './Works'
import styles from './index.module.css'

const ProfileRequests = ({
  id, isCreator, portfolio, creatorWorks, clientWorks,
}: {
  id: number, isCreator: boolean, portfolio: number, creatorWorks: WorkThumbnails, clientWorks: WorkThumbnails
}) => {
  const [option, setOption] = useState(isCreator ? 'creator' : 'client')

  const renderByOption = () => {
    switch (option) {
      case 'creator':
        return <Works works={creatorWorks} />
      case 'portfolio':
        return <Portfolio id={id} />
      default:
        return <Works works={clientWorks} />
    }
  }

  return (
    <div className={styles.container}>
      <MainContainerHeader>
        {!isCreator || (
          <>
            <MainContainerButton
              selected={option === 'creator'}
              disabled={option === 'creator'}
              onClick={() => { setOption('creator') }}
            >
              작업
            </MainContainerButton>
            {!portfolio || (
              <MainContainerButton
                selected={option === 'portfolio'}
                disabled={option === 'portfolio'}
                onClick={() => { setOption('portfolio') }}
              >
                소개
              </MainContainerButton>
            )}
          </>
        )}
        <MainContainerButton
          selected={option === 'client'}
          disabled={option === 'client'}
          onClick={() => { setOption('client') }}
        >
          요청한 작업
        </MainContainerButton>
      </MainContainerHeader>
      {renderByOption()}
    </div>
  )
}

export default ProfileRequests
