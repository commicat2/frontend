'use client'

import { useEffect, useState } from 'react'
import TiptapImage from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { getPublicPortfolio } from 'lib/api/queryFunctions'
import styles from './Portfolio.module.css'

const Portfolio = ({ id }: Id) => {
  const [content, setContent] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      Youtube.configure({ HTMLAttributes: { class: 'youtube-video' } }),
    ],
    editable: false,
    immediatelyRender: false,
  })

  useEffect(() => {
    const handleGetPublicPortfolio = async () => {
      try {
        const data = await getPublicPortfolio(id)
        if (data) { const sanitizedContent = data.content.replace(/<p><\/p>/g, '<p>\n</p>'); setContent(sanitizedContent) }
      } catch { setContent('') }
    }

    handleGetPublicPortfolio()
  }, [id])

  useEffect(() => {
    if (editor && content && !isLoaded) { editor.commands.setContent(content); setIsLoaded(true) }
  }, [editor, content, isLoaded])

  if (!editor) return null

  return <div className={styles.container}><EditorContent className={styles.editor} editor={editor} /></div>
}

export default Portfolio
