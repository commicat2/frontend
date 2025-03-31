import { useState, useRef } from 'react'
import { getFileName } from 'lib/utils/common'
import styles from './WorkFom.module.css'

const TextWorkForm = ({ setFormData, isHidden }: { setFormData: SetState<CreateWorkRequest>, isHidden: boolean }) => {
  const [files, setFiles] = useState<(File | undefined)[]>([])
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const [validateError, setValidateError] = useState('')

  const handleUploadFileClick = (index: number) => { return fileRefs[index]?.current?.click() }

  const updateFile = (index: number, file?: File) => {
    let key = ''
    switch (index) {
      case 0: key = 'file1'; break
      case 1: key = 'file2'; break
      case 2: key = 'file3'; break
      default: return
    }
    const newFiles = [...files]
    newFiles[index] = file
    setFiles(newFiles)
    setFormData((prev) => { return { ...prev, [key]: file } })
    if (!file && fileRefs[index].current?.value) fileRefs[index].current.value = ''
    setValidateError('')
  }
  const updateTextSample = (value: string) => {
    setFormData((prev) => { return { ...prev, text_sample: value } })
    setValidateError('')
  }
  const updateHashTags = (index: number, value: string) => {
    let key = ''
    switch (index) {
      case 0: key = 'hash_tag1'; break
      case 1: key = 'hash_tag2'; break
      case 2: key = 'hash_tag3'; break
      default: return
    }
    setFormData((prev) => { return { ...prev, [key]: value } })
    setValidateError('')
  }

  return (
    <div className={styles.container}>
      <p className={styles.error}>{validateError}</p>
      <p className={`${styles.comment} ${styles.first}`}>클라이언트에게 전달할 결과물을 업로드해주세요.</p>
      <p className={styles.comment}>파일이 4개 이상이거나 용량이 너무 클 경우 압축 파일(zip)을 업로드해주세요.</p>
      <div className={styles.row}>
        <p>파일1:</p>
        <input
          id="file1"
          type="file"
          ref={fileRefs[0]}
          style={{ display: 'none' }}
          onChange={(e) => { updateFile(0, e.target.files?.[0]) }}
        />
        {files[0] ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => { updateFile(0) }}
          >
            {getFileName(files[0].name)}
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => { handleUploadFileClick(0) }}
          >
            업로드
          </button>
        )}
      </div>
      <div className={styles.row}>
        <p>파일2:</p>
        <input
          id="file2"
          type="file"
          ref={fileRefs[1]}
          style={{ display: 'none' }}
          onChange={(e) => { updateFile(1, e.target.files?.[0]) }}
        />
        {files[1] ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => { updateFile(1) }}
          >
            {getFileName(files[1].name)}
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => { handleUploadFileClick(1) }}
          >
            업로드
          </button>
        )}
      </div>
      <div className={styles.row}>
        <p>파일3:</p>
        <input
          id="file3"
          type="file"
          ref={fileRefs[2]}
          style={{ display: 'none' }}
          onChange={(e) => { updateFile(2, e.target.files?.[0]) }}
        />
        {files[2] ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => { updateFile(2) }}
          >
            {getFileName(files[2].name)}
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => { handleUploadFileClick(2) }}
          >
            업로드
          </button>
        )}
      </div>
      {!isHidden && (
        <>
          <p className={`${styles.comment} ${styles.first}`}>상세 페이지에 등록될 텍스트를 입력해주세요.</p>
          <p className={styles.comment}>작업 파일과 같거나 작업 파일의 일부여야 합니다.</p>
          <p className={styles.comment}>도입부의 텍스트는 썸네일에 노출됩니다.</p>
          <p>샘플:</p>
          <textarea
            className={styles.textSampleLong}
            id="textSample"
            onBlur={(e) => { updateTextSample(e.target.value) }}
          />
          <div className={`${styles.row} ${styles.first}`}>
            <p>해시 태그:</p>
            <input
              className={styles.textInput}
              id="hashTag1"
              type="text"
              onBlur={(e) => { updateHashTags(0, e.target.value) }}
            />
            <input
              className={styles.textInput}
              id="hashTag2"
              type="text"
              onBlur={(e) => { updateHashTags(1, e.target.value) }}
            />
            <input
              className={styles.textInput}
              id="hashTag3"
              type="text"
              onBlur={(e) => { updateHashTags(2, e.target.value) }}
            />
            <p className={styles.comment}>검색에 이용됩니다. (선택사항)</p>
          </div>
        </>
      )}
    </div>
  )
}

export default TextWorkForm
