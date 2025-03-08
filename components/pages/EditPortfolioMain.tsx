'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { checkIsCreator, downloadFile } from 'lib/api/queryFunctions'
import { useGetPortfolio, usePostPortfolio, useDeletePortfolio } from 'lib/api/queryHooks'
import { userIdFromJas } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import Modal from 'components/common/Modal'
import MainContainer from 'components/common/MainContainer'
import MainContainerHeader from 'components/common/MainContainerHeader'
import styles from './EditPortfolioMain.module.css'

const EditPortfolioMain = () => {
  const { refetch, isLoading } = useGetPortfolio()
  const { mutate: postPortfolio, isPending: postPending } = usePostPortfolio()
  const { mutate: deletePortfolio, isPending: deletePending } = useDeletePortfolio()
  const router = useRouter()
  const [myId, setMyId] = useState(0)
  const imageRef = useRef<HTMLInputElement>(null)
  const [isCreator, setIsCreator] = useState(false)
  const [hasInitial, setHasInitial] = useState(false)
  const [content, setContent] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAddYoutubeModalOpen, setIsAddYoutubeModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      Youtube.configure({ HTMLAttributes: { class: 'youtube-video' } }),
    ],
    immediatelyRender: false,
  })

  useLayoutEffect(() => {
    const creatorCheck = async () => {
      try {
        const { is_creator } = await checkIsCreator()
        if (is_creator) { setMyId(userIdFromJas()); setIsCreator(true) } else router.push('/')
      } catch { router.push('/') }
    }
    if (!localStorage.getItem('jas')) router.push('/sign-in')
    else creatorCheck()
  }, [router])

  useLayoutEffect(() => {
    const handleRefetch = async () => {
      try {
        const { data } = await refetch()
        if (data) {
          let updatedContent = data.content
          const imgTags = data.content.match(/<img[^>]+>/g) || []
          if (imgTags.length) {
            try {
              await Promise.all(imgTags.map(async (imgTag: string) => {
                const src = imgTag.match(/<img src="(.*?)"/)?.[1] || ''
                const blob = await downloadFile(src)
                const extension = src.split('.').pop()
                let mimeType = ''
                switch (extension) {
                  case 'jpg':
                  case 'jpeg':
                    mimeType = 'image/jpeg'
                    break
                  case 'png':
                    mimeType = 'image/png'
                    break
                  case 'gif':
                    mimeType = 'image/gif'
                    break
                  case 'webp':
                    mimeType = 'image/webp'
                    break
                  default:
                    break
                }
                const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }))
                updatedContent = updatedContent.replace(src, blobUrl)
              }))
            } catch { setContent(''); setHasInitial(false) }
          }
          setContent(updatedContent)
          setHasInitial(!!updatedContent)
        }
      } catch { setContent(''); setHasInitial(false) }
    }

    if (isCreator) handleRefetch()
  }, [isCreator, refetch])

  useLayoutEffect(() => {
    if (editor && !isLoaded) {
      if (!content) editor.chain().focus().insertContent(' ').run()
      else { editor.commands.setContent(content); setIsLoaded(true) }
    }
  }, [editor, content, isLoaded])

  if (!editor || !isCreator) return <main><IsLoading /></main>

  const handleEditorClick = () => { editor.commands?.focus() }

  const addYoutube = (url?: string) => {
    if (!url?.includes('youtu.be/') && !url?.includes('youtube.com/')) setErrorMessage('유효한 링크가 아닙니다.')
    else editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) setErrorMessage('webp/jpeg/png/gif 이미지를 업로드해주세요.')
    else editor.chain().focus().setImage({ src: URL.createObjectURL(file) }).run()
  }

  const getFileFromBlob = async (src: string, index: number) => {
    const response = await fetch(src)
    const blob = await response.blob()

    let extension = ''
    switch (blob.type) {
      case 'image/jpeg':
        extension = '.jpg'
        break
      case 'image/png':
        extension = '.png'
        break
      case 'image/gif':
        extension = '.gif'
        break
      case 'image/webp':
        extension = '.webp'
        break
      default:
        throw new Error('유효하지 않은 이미지가 포함되어 있습니다.')
    }

    const filename = `portfolio_${myId}_${Date.now()}${index}${extension}`
    const file = new File([blob], filename, { type: blob.type })
    return file
  }

  const handleSubmit = async () => {
    let editorContent = editor.getHTML()
    if (editorContent.length > 15000) { setErrorMessage('1만자 이하로 작성해주세요.'); return }
    const imgTags = editorContent.match(/<img[^>]+>/g) || []
    if (imgTags.length > 10) { setErrorMessage('10개 이하의 이미지를 업로드해주세요.'); return }

    const images: File[] = []
    if (imgTags.length) {
      try {
        await Promise.all(imgTags.map(async (imgTag: string, index: number) => {
          const src = imgTag.match(/<img src="(.*?)"/)?.[1] || ''
          const file = await getFileFromBlob(src, index)
          images.push(file)
          editorContent = editorContent.replace(src, `${process.env.NEXT_PUBLIC_STORAGE_URL}/media/portfolio/${file.name}`)
        }))
      } catch { setErrorMessage('유효하지 않은 이미지가 포함되어 있습니다.'); return }
    }

    const data: PortfolioRequest = new FormData()
    data.append('content', editorContent)
    images.forEach((image, index) => { if (image) data.append(`image${index + 1}`, image) })
    postPortfolio(data, {
      onError: (error) => { setErrorMessage(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => { setSuccessMessage('저장 완료'); setHasInitial(true) },
    })
  }

  const handleDelete = () => {
    deletePortfolio(undefined, {
      onError: (error) => { setErrorMessage(error.response?.data?.message || '잠시 후 다시 시도해주세요.') },
      onSuccess: () => {
        setSuccessMessage('삭제 완료')
        setHasInitial(false)
        setIsLoaded(false)
        setContent('')
        editor.commands.setContent('')
      },
    })
  }

  return (
    <main>
      <MainContainer>
        {(isLoading || postPending || deletePending) && <IsLoading />}
        <MainContainerHeader>
          <h3>포트폴리오</h3>
        </MainContainerHeader>
        <input type="file" ref={imageRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        <div className={styles.iconContainer}>
          <button className={styles.imageIcon} type="button" onClick={() => { imageRef?.current?.click() }}>
            <Image fill sizes="100%" src="/icon-image.png" alt="Image" />
          </button>
          <button className={styles.youtubeIcon} type="button" onClick={() => { setIsAddYoutubeModalOpen(true) }}>
            <Image fill sizes="100%" src="/icon-youtube.png" alt="Youtube" />
          </button>
        </div>
        <button className={styles.editorContainer} type="button" onClick={handleEditorClick} aria-label="editor">
          <EditorContent className={styles.editor} editor={editor} />
        </button>
        <div className={styles.submitButtons}>
          <button className={styles.button} type="button" onClick={handleSubmit}>저장</button>
          {!hasInitial || <button className={styles.button} type="button" onClick={() => { setIsDeleteModalOpen(true) }}>삭제</button>}
        </div>
      </MainContainer>
      {!isAddYoutubeModalOpen || (
        <Modal
          option="addYoutube"
          closeModal={() => { setIsAddYoutubeModalOpen(false) }}
          returnResult={addYoutube}
        />
      )}
      {!isDeleteModalOpen || (
        <Modal
          option="deletePortfolio"
          closeModal={() => { setIsDeleteModalOpen(false) }}
          returnResult={handleDelete}
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
    </main>
  )
}

export default EditPortfolioMain
