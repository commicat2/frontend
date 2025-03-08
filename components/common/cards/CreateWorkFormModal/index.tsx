'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCreateWork } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import BaseRequestCard from 'components/common/cards/BaseRequestCard'
import Modal from 'components/common/Modal'
import ImageWorkForm from './ImageWorkForm'
import AudioWorkForm from './AudioWorkForm'
import VideoWorkForm from './VideoWorkForm'
import TextWorkForm from './TextWorkForm'
import OtherWorkForm from './OtherWorkForm'
import styles from './index.module.css'

const CreateWorkFormModal = ({
  request, setRequest, refetch, setSuccessMessage, setErrorMessage,
}: {
  request: CommicatRequest
  setRequest: SetState<CommicatRequest | null>
  refetch: () => unknown
  setSuccessMessage: SetState<string>
  setErrorMessage: SetState<string>
}) => {
  const { mutate, isPending } = useCreateWork()
  const [formData, setFormData] = useState<CreateWorkRequest>({ request_id: request.id, genre: request.genre, sample_genre: request.genre === 5 ? 1 : request.genre })
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handleCreateWork = () => {
    if (!formData.file1 && !formData.file2 && !formData.file3) { setErrorMessage('파일을 업로드해주세요.'); return }
    if (!request.hidden) {
      switch (formData.sample_genre) {
        case 1:
          if (!formData.sample1 && !formData.sample2 && !formData.sample3) { setErrorMessage('샘플을 업로드해주세요.'); return }
          if (!formData.thumbnail) { setErrorMessage('썸네일을 업로드해주세요.'); return }
          break
        case 2:
        case 3:
          if (!formData.sample1) { setErrorMessage('샘플1을 업로드해주세요.'); return }
          break
        case 4:
          if (!formData.text_sample) { setErrorMessage('텍스트 샘플을 입력해주세요.'); return }
          break
        default:
          if (!formData.sample1 && !formData.sample2 && !formData.sample3) { setErrorMessage('샘플을 업로드해주세요.'); return }
          break
      }
    }
    mutate(formData, {
      onError: (error) => { setErrorMessage(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => { setSuccessMessage(`#${request?.id}번 작업이 완료되었습니다.\n대금 지급은 24시간 내로 이루어집니다.`); refetch(); setRequest(null) },
    })
  }

  const renderForm = () => {
    switch (request?.genre) {
      case 1:
        return <ImageWorkForm setFormData={setFormData} isHidden={request.hidden} />
      case 2:
        return <AudioWorkForm setFormData={setFormData} isHidden={request.hidden} />
      case 3:
        return <VideoWorkForm setFormData={setFormData} isHidden={request.hidden} />
      case 4:
        return <TextWorkForm setFormData={setFormData} isHidden={request.hidden} />
      case 5:
        return <OtherWorkForm setFormData={setFormData} isHidden={request.hidden} />
      default:
        return null
    }
  }

  return (
    <>
      {!isPending || <IsLoading /> }
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <button className={styles.backButton} type="button" onClick={() => { setRequest(null) }} disabled={isPending}>
            <Image fill sizes="100%" src="/icon-back-button.svg" alt="Back Button" />
          </button>
          <div className={styles.content}>
            <div className={styles.card}>
              {renderForm()}
              <button className={styles.submitButton} type="button" onClick={() => { setIsConfirmModalOpen(true) }} disabled={isPending}>완료</button>
            </div>
            <div className={styles.card}>
              <BaseRequestCard request={request} expirationLabel="작업 완료 기한:" />
            </div>
          </div>
        </div>
      </div>
      {!isConfirmModalOpen || (
        <Modal
          option="acceptRequest"
          title="작업 완료"
          content={`#${request.id}번의 요청을 완료하시겠습니까?`}
          closeModal={() => { setIsConfirmModalOpen(false) }}
          returnResult={handleCreateWork}
        />
      )}
    </>
  )
}

export default CreateWorkFormModal
