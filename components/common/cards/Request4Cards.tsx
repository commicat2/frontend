'use client'

import { useState } from 'react'
import Link from 'next/link'
import { downloadFile } from 'lib/api/queryFunctions'
import { getFileName } from 'lib/utils/common'
import IsLoading from 'components/common/IsLoading'
import BaseRequestCard from './BaseRequestCard'
import styles from './BaseRequestCards.module.css'

const Request4Cards = ({ requests }: { requests: CommicatRequest[] }) => {
  const [isPending, setIsPending] = useState(false)
  const handleDownload = async (url: string | null) => {
    if (url) {
      try {
        setIsPending(true)
        const blob = await downloadFile(url)
        const blobUrl = URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = blobUrl
        link.setAttribute('download', url.split('/').pop() || url)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setIsPending(false)
      } catch { /* ignore error */ }
    }
  }

  return (
    <div className={styles.container}>
      {!isPending || <IsLoading />}
      {requests.map((request) => {
        return (
          <div key={request.id} className={styles.card}>
            <BaseRequestCard request={request} />
            <div className={styles.linkContainer}>
              {!request.file1 || (
                <div>
                  <span>파일1: </span>
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => { handleDownload(request.file1) }}
                  >
                    {getFileName(request.file1)}
                  </button>
                </div>
              )}
              {!request.file2 || (
                <div>
                  <span>파일2: </span>
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => { handleDownload(request.file2) }}
                  >
                    {getFileName(request.file2)}
                  </button>
                </div>
              )}
              {!request.file3 || (
                <div>
                  <span>파일3: </span>
                  <button
                    className={styles.link}
                    type="button"
                    onClick={() => { handleDownload(request.file3) }}
                  >
                    {getFileName(request.file3)}
                  </button>
                </div>
              )}
              {!request.work || (
                <div>
                  <span>상세 페이지: </span>
                  <Link className={styles.link} target="_blank" href={`work/${request.work}`}>
                    {`commicat.com/work/${request.work}`}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Request4Cards
