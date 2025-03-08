'use client'

import { useState } from 'react'
import Modal from 'components/common/Modal'
import BaseRequestCard from './BaseRequestCard'
import CreateWorkFormModal from './CreateWorkFormModal'
import styles from './BaseRequestCards.module.css'

const Request3Cards = ({ requests, refetch = () => { }, isClient }: {
  requests: CommicatRequest[], refetch?: () => unknown, isClient?: boolean
}) => {
  const [selectedRequest, setSelectedRequest] = useState<CommicatRequest | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  return (
    <>
      <div className={styles.container}>
        {requests.map((request) => {
          return (
            <button
              key={request.id}
              className={!isClient ? styles.isCreator : styles.isClient}
              type="button"
              disabled={!!isClient}
              aria-label="완료하기"
              onClick={() => { setSelectedRequest(request) }}
            >
              <div className={styles.card}>
                <BaseRequestCard request={request} expirationLabel="작업 완료 기한:" />
              </div>
            </button>
          )
        })}
      </div>
      {!selectedRequest || (
        <CreateWorkFormModal
          request={selectedRequest}
          setRequest={setSelectedRequest}
          refetch={refetch}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
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

export default Request3Cards
