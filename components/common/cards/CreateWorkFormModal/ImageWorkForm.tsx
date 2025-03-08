/* eslint-disable @next/next/no-img-element */

import Image from 'next/image'
import { useRef, useState } from 'react'
import { getFileName } from 'lib/utils/common'
import CroppieModal from 'components/common/CroppieModal'
import styles from './WorkFom.module.css'

const ImageWorkForm = ({ setFormData, isHidden }: { setFormData: SetState<CreateWorkRequest>, isHidden: boolean }) => {
  const [files, setFiles] = useState<(File | undefined)[]>([])
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const [samples, setSamples] = useState<(File | undefined)[]>([])
  const sampleRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const [intrinsicWidth1, setIntrinsicWidth1] = useState(0)
  const [intrinsicHeight1, setIntrinsicHeight1] = useState(0)
  const [intrinsicWidth2, setIntrinsicWidth2] = useState(0)
  const [intrinsicHeight2, setIntrinsicHeight2] = useState(0)
  const [intrinsicWidth3, setIntrinsicWidth3] = useState(0)
  const [intrinsicHeight3, setIntrinsicHeight3] = useState(0)
  const [thumbnail, setThumbnail] = useState<File | undefined>()
  const thumbnailRef = useRef<HTMLInputElement>(null)
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
  const [croppieOptions, setCroppieOptions] = useState<CroppieOptions>({
    width: 0, height: 0, name: '', path: '', option: '',
  })
  const [validateError, setValidateError] = useState('')

  const handleUploadFileClick = (index: number) => { return fileRefs[index]?.current?.click() }
  const handleUploadSampleClick = (index: number) => { return sampleRefs[index]?.current?.click() }
  const handleUploadThumbnailClick = () => { return thumbnailRef?.current?.click() }

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
    setValidateError('')
    if (!file && fileRefs[index].current?.value) fileRefs[index].current.value = ''
  }
  const updateSample = (index: number, file?: File) => {
    let key = ''
    switch (index) {
      case 0: key = 'sample1'; break
      case 1: key = 'sample2'; break
      case 2: key = 'sample3'; break
      default: return
    }
    const newSamples = [...samples]
    newSamples[index] = file
    setSamples(newSamples)
    setFormData((prev) => { return { ...prev, [key]: file } })
    setValidateError('')
    if (!file && sampleRefs[index].current?.value) sampleRefs[index].current.value = ''
  }
  const updateThumbnail = (file?: File) => {
    setThumbnail(file)
    setFormData((prev) => { return { ...prev, thumbnail: file } })
    setValidateError('')
    if (!file && thumbnailRef.current?.value) thumbnailRef.current.value = ''
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

  const handleSampleLoad = (index: number, img: HTMLImageElement) => {
    if (img) {
      switch (index) {
        case 0:
          setIntrinsicWidth1(img.naturalWidth)
          setIntrinsicHeight1(img.naturalHeight)
          break
        case 1:
          setIntrinsicWidth2(img.naturalWidth)
          setIntrinsicHeight2(img.naturalHeight)
          break
        case 2:
          setIntrinsicWidth3(img.naturalWidth)
          setIntrinsicHeight3(img.naturalHeight)
          break
        default:
          break
      }
    }
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
    e.stopPropagation()
    const file = e.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setValidateError('webp, jpeg, png 파일을 등록해주세요.')
      return
    }
    const width = 800
    const height = 800
    const { name } = file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCroppieOptions({
          width, height, name, path: reader.result, option,
        })
        setIsThumbnailUploading(true)
      } else { setValidateError('다시 시도해주세요.') }
    }
    reader.onerror = () => { setValidateError('다시 시도해주세요.') }
  }
  const handleImageProcessed = (file: File) => {
    setIsThumbnailUploading(false)
    updateThumbnail(file)
  }

  return (
    <div className={styles.container}>
      <p className={styles.error}>{validateError}</p>
      <p className={styles.comment}>* 클라이언트에게 전달할 결과물을 업로드해주세요.</p>
      <p className={styles.comment}>* 파일이 4개 이상이거나 용량이 클 경우 압축 파일(zip)을 업로드해주세요.</p>
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
          <p className={`${styles.comment} ${styles.first}`}>* 상세 페이지에 등록될 이미지 파일을 업로드해주세요.</p>
          <p className={styles.comment}>* 작업 파일과 같거나 유사한 이미지여야 합니다.</p>
          <p className={styles.comment}>
            * 샘플 레이어:&nbsp;
            <a className={styles.commentLink} target="_blank" href="https://drive.google.com/drive/folders/1NZT9mOzCMXU_LjxH0TQGNKrzQ6YT1G7Z?usp=sharing" rel="noopener noreferrer">
              다운로드 링크
            </a>
          </p>
          <div className={styles.row}>
            <p>샘플1:</p>
            <input
              id="sample1"
              type="file"
              ref={sampleRefs[0]}
              style={{ display: 'none' }}
              onChange={(e) => { updateSample(0, e.target.files?.[0]) }}
            />
            {samples[0] ? (
              <div
                className={styles.imageSample}
                style={{
                  maxWidth: intrinsicWidth1 ? `${intrinsicWidth1}px` : '90%',
                }}
              >
                <img
                  src={URL.createObjectURL(samples[0])}
                  onLoad={(e) => { return handleSampleLoad(0, e.target as HTMLImageElement) }}
                  style={{ display: 'none' }}
                  alt="Sample 1 Temp"
                />
                <div
                  className={styles.imageSampleContainer}
                  style={{
                    maxWidth: intrinsicWidth1 ? `${intrinsicWidth1}px` : '90%',
                    paddingBottom: intrinsicHeight1 ? `${(intrinsicHeight1 / intrinsicWidth1) * 90}%` : '90%',
                  }}
                >
                  <Image fill sizes="100%" priority src={URL.createObjectURL(samples[0])} alt="Sample 1" />
                </div>
                <button type="button" className={styles.deleteImageSample} onClick={() => { updateSample(0) }}>
                  <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
                </button>
              </div>
            ) : (
              <button
                className={styles.button}
                type="button"
                onClick={() => { handleUploadSampleClick(0) }}
              >
                업로드
              </button>
            )}
          </div>
          <div className={styles.row}>
            <p>샘플2:</p>
            <input
              id="sample2"
              type="file"
              ref={sampleRefs[1]}
              style={{ display: 'none' }}
              onChange={(e) => { updateSample(1, e.target.files?.[0]) }}
            />
            {samples[1] ? (
              <div
                className={styles.imageSample}
                style={{
                  maxWidth: intrinsicWidth2 ? `${intrinsicWidth2}px` : '90%',
                }}
              >
                <img
                  src={URL.createObjectURL(samples[1])}
                  onLoad={(e) => { return handleSampleLoad(1, e.target as HTMLImageElement) }}
                  style={{ display: 'none' }}
                  alt="Sample 2 Temp"
                />
                <div
                  className={styles.imageSampleContainer}
                  style={{
                    maxWidth: intrinsicWidth2 ? `${intrinsicWidth2}px` : '90%',
                    paddingBottom: intrinsicHeight2 ? `${(intrinsicHeight2 / intrinsicWidth2) * 90}%` : '90%',
                  }}
                >
                  <Image fill sizes="100%" priority src={URL.createObjectURL(samples[1])} alt="Sample 2" />
                </div>
                <button type="button" className={styles.deleteImageSample} onClick={() => { updateSample(1) }}>
                  <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
                </button>
              </div>
            ) : (
              <button
                className={styles.button}
                type="button"
                onClick={() => { handleUploadSampleClick(1) }}
              >
                업로드
              </button>
            )}
          </div>
          <div className={styles.row}>
            <p>샘플3:</p>
            <input
              id="sample3"
              type="file"
              ref={sampleRefs[2]}
              style={{ display: 'none' }}
              onChange={(e) => { updateSample(2, e.target.files?.[0]) }}
            />
            {samples[2] ? (
              <div
                className={styles.imageSample}
                style={{
                  maxWidth: intrinsicWidth3 ? `${intrinsicWidth3}px` : '90%',
                }}
              >
                <img
                  src={URL.createObjectURL(samples[2])}
                  onLoad={(e) => { return handleSampleLoad(2, e.target as HTMLImageElement) }}
                  style={{ display: 'none' }}
                  alt="Sample 3 Temp"
                />
                <div
                  className={styles.imageSampleContainer}
                  style={{
                    maxWidth: intrinsicWidth3 ? `${intrinsicWidth3}px` : '90%',
                    paddingBottom: intrinsicHeight3 ? `${(intrinsicHeight3 / intrinsicWidth3) * 90}%` : '90%',
                  }}
                >
                  <Image fill sizes="100%" priority src={URL.createObjectURL(samples[2])} alt="Sample 3" />
                </div>
                <button type="button" className={styles.deleteImageSample} onClick={() => { updateSample(2) }}>
                  <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
                </button>
              </div>
            ) : (
              <button
                className={styles.button}
                type="button"
                onClick={() => { handleUploadSampleClick(2) }}
              >
                업로드
              </button>
            )}
          </div>
          <div className={styles.row}>
            <p>썸네일:</p>
            <input
              id="thumbnail"
              type="file"
              ref={thumbnailRef}
              style={{ display: 'none' }}
              onChange={(e) => { handleUploadImage(e, 'thumbnail') }}
            />
            {thumbnail ? (
              <div className={styles.thumbnail}>
                <div className={styles.thumbnailContainer}>
                  <Image fill sizes="100%" priority src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
                </div>
                <button type="button" className={styles.deleteThumbnail} onClick={() => { updateThumbnail() }}>
                  <Image fill sizes="100%" src="/icon-delete.svg" alt="Delete" />
                </button>
              </div>
            ) : (
              <button
                className={styles.button}
                type="button"
                onClick={() => { handleUploadThumbnailClick() }}
              >
                업로드
              </button>
            )}
          </div>
          <div className={`${styles.row} ${styles.first}`}>
            <p>코멘트:</p>
            <textarea
              className={styles.textSample}
              id="textSample"
              maxLength={500}
              onBlur={(e) => { updateTextSample(e.target.value) }}
            />
            <p className={styles.comment}>* 샘플 밑에 기재됩니다. (선택사항)</p>
          </div>
          <div className={`${styles.row} ${styles.first}`}>
            <p>해시 태그:</p>
            <input
              className={styles.textInput}
              id="hashTag1"
              type="text"
              maxLength={15}
              onBlur={(e) => { updateHashTags(0, e.target.value) }}
            />
            <input
              className={styles.textInput}
              id="hashTag2"
              type="text"
              maxLength={15}
              onBlur={(e) => { updateHashTags(1, e.target.value) }}
            />
            <input
              className={styles.textInput}
              id="hashTag3"
              type="text"
              maxLength={15}
              onBlur={(e) => { updateHashTags(2, e.target.value) }}
            />
            <p className={styles.comment}>* 검색에 이용됩니다. (선택사항)</p>
          </div>
        </>
      )}
      {!isThumbnailUploading || (
        <CroppieModal
          width={croppieOptions.width}
          height={croppieOptions.height}
          name={croppieOptions.name}
          path={croppieOptions.path}
          option={croppieOptions.option}
          closeModal={() => { setIsThumbnailUploading(false) }}
          returnResult={handleImageProcessed}
        />
      )}
    </div>
  )
}

export default ImageWorkForm
