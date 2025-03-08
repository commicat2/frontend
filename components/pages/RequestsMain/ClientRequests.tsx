'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useGetClientRequests } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import MainContainerButton from 'components/common/MainContainerButton'
import Request1Cards from 'components/common/cards/Request1Cards'
import Request2Cards from 'components/common/cards/Request2Cards'
import Request3Cards from 'components/common/cards/Request3Cards'
import Request4Cards from 'components/common/cards/Request4Cards'
import Request5Cards from 'components/common/cards/Request5Cards'
import styles from './Requests.module.css'

const ClientRequests = () => {
  const { data, isFetching, refetch } = useGetClientRequests()
  const [requests, setRequests] = useState<GetRequestsResponse>({
    1: [], 2: [], 3: [], 4: [], 5: [],
  })
  const [status, setStatus] = useState<StatusNumber>(1)

  useEffect(() => { refetch() }, [refetch])

  useEffect(() => { if (data) setRequests(data) }, [data])

  const renderRequestCards = () => {
    switch (status) {
      case 2:
        return <Request2Cards requests={requests[2]} isClient />
      case 3:
        return <Request3Cards requests={requests[3]} isClient />
      case 4:
        return <Request4Cards requests={requests[4]} />
      case 5:
        return <Request5Cards requests={requests[5]} />
      default:
        return <Request1Cards requests={requests[1]} isClient />
    }
  }

  return (
    <MainContainer>
      {isFetching && <IsLoading />}
      <MainContainerHeader>
        <MainContainerButton
          selected={status === 1}
          onClick={() => { setStatus(1) }}
          disabled={status === 1}
        >
          승인대기
        </MainContainerButton>
        <MainContainerButton
          selected={status === 2}
          onClick={() => { setStatus(2) }}
          disabled={status === 2}
        >
          결제대기
        </MainContainerButton>
        <MainContainerButton
          selected={status === 3}
          onClick={() => { setStatus(3) }}
          disabled={status === 3}
        >
          작업중
        </MainContainerButton>
        <MainContainerButton
          selected={status === 4}
          onClick={() => { setStatus(4) }}
          disabled={status === 4}
        >
          완료
        </MainContainerButton>
        <MainContainerButton
          selected={status === 5}
          onClick={() => { setStatus(5) }}
          disabled={status === 5}
        >
          취소
        </MainContainerButton>
      </MainContainerHeader>
      <button className={styles.reload} type="button" onClick={() => { refetch() }}>
        <Image
          fill
          sizes="100%"
          src="/icon-reload.png"
          alt="Reload"
        />
      </button>
      {renderRequestCards()}
    </MainContainer>
  )
}

export default ClientRequests
