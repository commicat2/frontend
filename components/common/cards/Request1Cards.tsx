'use client'

import { useState } from 'react'
import { useUpdateRequest } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import Badge from 'components/common/Badge'
import Modal from 'components/common/Modal'
import BaseRequestCard from './BaseRequestCard'
import styles from './BaseRequestCards.module.css'

const Request1Cards = ({ requests, refetch = () => { }, isClient }: {
  requests: CommicatRequest[], refetch?: () => unknown, isClient?: boolean
}) => {
  const { mutate, isPending } = useUpdateRequest()
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [requestId, setRequestId] = useState(0)

  const closeModal = () => {
    setRequestId(0)
    setIsAcceptModalOpen(false)
    setIsRejectModalOpen(false)
  }
  const handleAccept = (id: number) => {
    setRequestId(id)
    setIsRejectModalOpen(false)
    setIsAcceptModalOpen(true)
  }
  const handleReject = (id: number) => {
    setRequestId(id)
    setIsAcceptModalOpen(false)
    setIsRejectModalOpen(true)
  }
  const acceptRequest = () => {
    mutate({ id: requestId, status: 2 }, {
      onError: () => { setErrorMessage('다시 시도해주세요.') },
      onSuccess: () => { setSuccessMessage(`#${requestId}번 작업이 승인되었습니다.\n결제를 기다려주세요.`); refetch() },
    })
  }
  const rejectRequest = (message?: string) => {
    const reject_reason = !message ? undefined : message
    mutate({
      id: requestId, status: 5, reject_reason, expiration_reason: '크리에이터 미승인',
    }, {
      onError: () => { setErrorMessage('다시 시도해주세요.') },
      onSuccess: () => { setSuccessMessage(`#${requestId}번 작업이 거절되었습니다.`); refetch() },
    })
  }

  return (
    <>
      {!isPending || <IsLoading />}
      <div className={styles.container}>
        {requests.map((request) => {
          return (
            <div key={request.id} className={styles.card}>
              <BaseRequestCard request={request} expirationLabel="응답 기한:" />
              {!isClient && (
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    type="button"
                    aria-label="승인"
                    onClick={() => { handleAccept(request.id) }}
                  >
                    <Badge option="accept" />
                  </button>
                  <button
                    className={styles.button}
                    type="button"
                    aria-label="거절"
                    onClick={() => { handleReject(request.id) }}
                  >
                    <Badge option="reject" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {!isAcceptModalOpen || (
        <Modal
          option="acceptRequest"
          title="요청 승인"
          content={`#${requestId}번의 요청을 승인하시겠습니까?`}
          closeModal={closeModal}
          returnResult={acceptRequest}
        />
      )}
      {!isRejectModalOpen || (
        <Modal
          option="rejectRequest"
          title="요청 거절"
          closeModal={closeModal}
          returnResult={rejectRequest}
        />
      )}
      {!successMessage || (
        <Modal
          option="common"
          content={successMessage}
          closeModal={() => { setSuccessMessage('') }}
        />
      )}
      {!errorMessage || (
        <Modal
          option="common"
          content={errorMessage}
          closeModal={() => { setErrorMessage('') }}
        />
      )}
    </>
  )
}

export default Request1Cards
