'use client'

import Croppie from 'croppie'
import { useEffect, useRef } from 'react'
import 'lib/croppie.css'
import styles from './CroppieModal.module.css'

const CroppieModal = ({
  width, height, name, path, option, closeModal, returnResult,
}: {
  width: number
  height: number
  name: string
  path: string
  option: string
  closeModal: () => void
  returnResult: (file: File, option: string) => void
}) => {
  const croppieRef = useRef<HTMLDivElement>(null)
  const croppieInstanceRef = useRef<Croppie | null>(null)

  useEffect(() => {
    if (croppieRef.current && !croppieInstanceRef.current) {
      croppieInstanceRef.current = new Croppie(croppieRef.current, {
        viewport: { width: width / 3, height: height / 3, type: option === 'pic' ? 'circle' : 'square' },
        boundary: { width: width / 3 + 100, height: height / 3 + 100 },
        showZoomer: true,
        enableOrientation: true,
      })
    }
  }, [width, height, option, path])

  useEffect(() => {
    if (croppieInstanceRef.current && path) croppieInstanceRef.current.bind({ url: path })
  }, [path])

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

  const handleSubmit = async (e: CommonFormEvent) => {
    e.preventDefault()
    if (croppieInstanceRef.current) {
      const blob = await croppieInstanceRef.current.result({
        type: 'blob',
        size: { width, height },
        format: 'webp',
        quality: 1,
      })
      const file = new File([blob], `${name}.webp`, { type: 'image/webp' })
      returnResult(file, option)
      closeModal()
    }
  }

  return (
    <div className={`${styles.modalOverlay}`}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <div className={styles.blob} ref={croppieRef} />
        <button className={styles.button} type="submit">확인</button>
      </form>
    </div>
  )
}

export default CroppieModal
