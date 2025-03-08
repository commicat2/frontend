'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import CommonModal from './CommonModal'
import PasswordCheckModal from './PasswordCheckModal'
import SendDmModal from './SendDmModal'
import AcceptRequestModal from './AcceptRequestModal'
import RejectRequestModal from './RejectRequestModal'
import DeletePortfolioModal from './DeletePortfolioModal'
import AddYoutubeModal from './AddYoutubeModal'
import styles from './index.module.css'

const Modal = ({
  option, closeModal, title, content, returnResult = () => { },
}: {
  option: string, closeModal: () => void, title?: string, content?: string, returnResult?: (param?: string) => unknown
}) => {
  const options: Record<string, React.ComponentType<ModalComponentProps>> = {
    common: CommonModal,
    passwordCheck: PasswordCheckModal,
    sendDm: SendDmModal,
    acceptRequest: AcceptRequestModal,
    rejectRequest: RejectRequestModal,
    deletePortfolio: DeletePortfolioModal,
    addYoutube: AddYoutubeModal,
  }

  const SelectedModal = options[option]

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return
      if (e.target.classList?.contains(styles.modalOverlay)) closeModal()
    }
    const handleEscKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [closeModal])

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <SelectedModal
          title={title}
          content={content}
          closeModal={closeModal}
          returnResult={returnResult}
        />
        <button className={styles.closeButton} type="button" onClick={closeModal}>
          <Image fill src="/icon-close.svg" alt="Close" />
        </button>
      </div>
    </div>
  )
}

export default Modal
