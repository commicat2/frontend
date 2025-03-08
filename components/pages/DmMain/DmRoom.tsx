'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useCheckHasUnreadDm, useGetDirectMessages, useSendDirectMessage } from 'lib/api/queryHooks'
import IsLoading from 'components/common/IsLoading'
import styles from './DmRoom.module.css'

const DmRoom = ({
  selectedId, setSelectedId, myId, refetchRooms,
}: {
  selectedId: number, setSelectedId: SetState<number>, myId: number, refetchRooms: () => Promise<unknown>
}) => {
  const { refetch: checkHasUnreadDmRefetch } = useCheckHasUnreadDm(selectedId)
  const { data, isLoading, refetch } = useGetDirectMessages(selectedId)
  const { mutate: sendDirectMessage } = useSendDirectMessage(selectedId)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<DirectMessage[]>(data || [])
  const [validateError, setValidateError] = useState('')

  const scrollToBottom = () => { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight }

  useEffect(() => { scrollToBottom() }, [messages])

  useEffect(() => {
    setValidateError('')
    if (contentRef.current?.value) contentRef.current.value = ''
    refetch()
  }, [selectedId, refetch])

  useEffect(() => { if (data) setMessages(data); refetchRooms() }, [data, refetchRooms])

  useEffect(() => {
    const handleCheckHasUnreadDm = async () => {
      const { data: checkData } = await checkHasUnreadDmRefetch()
      if (checkData?.has_unread_dm) refetch()
    }
    const pollHasUnreadDm = setInterval(handleCheckHasUnreadDm, 500)
    return () => { clearInterval(pollHasUnreadDm) }
  }, [checkHasUnreadDmRefetch, refetch])

  const handleSubmit = (e: CommonFormEvent) => {
    e.preventDefault()
    const content = contentRef.current?.value || ''
    if (!content) return
    sendDirectMessage({ content }, {
      onError: (error) => { setValidateError(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => {
        refetchRooms()
        setMessages((prev) => { return [...prev, { id: prev[prev.length - 1].id + 1000, sender: myId, content }] })
        setValidateError('')
        if (contentRef.current?.value) contentRef.current.value = ''
      },
    })
  }

  return (
    <>
      {!isLoading || <IsLoading />}
      <button className={styles.backButton} type="button" onClick={() => { setSelectedId(0) }}>
        <Image fill sizes="100%" src="/icon-back-button.svg" alt="Back Button" />
      </button>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.messageContainer}>
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`${message.sender === myId ? styles.myMessage : styles.yourMessage} ${styles.message}`}
              >
                {message.content}
              </div>
            )
          })}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.error}>{validateError}</p>
          <input
            className={styles.input}
            type="text"
            id="content"
            aria-label="content"
            maxLength={250}
            ref={contentRef}
            placeholder="메세지를 입력해주세요."
          />
        </form>
      </div>
    </>
  )
}

export default DmRoom
