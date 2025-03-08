'use client'

import { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import styles from './ImageSample.module.css'

const ImageSample = ({ details }: { details: WorkDetails }) => {
  const [intrinsicWidth1, setIntrinsicWidth1] = useState(0)
  const [intrinsicHeight1, setIntrinsicHeight1] = useState(0)
  const [intrinsicWidth2, setIntrinsicWidth2] = useState(0)
  const [intrinsicHeight2, setIntrinsicHeight2] = useState(0)
  const [intrinsicWidth3, setIntrinsicWidth3] = useState(0)
  const [intrinsicHeight3, setIntrinsicHeight3] = useState(0)

  useLayoutEffect(() => {
    const img: HTMLImageElement = new window.Image()
    img.src = details.sample1 || ''
    img.onload = () => {
      setIntrinsicWidth1(img.naturalWidth)
      if (img.naturalHeight < 1000) setIntrinsicHeight1(img.naturalHeight)
    }
  }, [details.sample1])

  useLayoutEffect(() => {
    const img: HTMLImageElement = new window.Image()
    img.src = details.sample2 || ''
    img.onload = () => {
      setIntrinsicWidth2(img.naturalWidth)
      if (img.naturalHeight < 1000) setIntrinsicHeight2(img.naturalHeight)
    }
  }, [details.sample2])

  useLayoutEffect(() => {
    const img: HTMLImageElement = new window.Image()
    img.src = details.sample3 || ''
    img.onload = () => {
      setIntrinsicWidth3(img.naturalWidth)
      if (img.naturalHeight < 1000) setIntrinsicHeight3(img.naturalHeight)
    }
  }, [details.sample3])

  return (
    <>
      {!details.sample1 || (
      <div
        className={styles.image}
        style={{
          maxWidth: intrinsicWidth1 ? `${intrinsicWidth1}px` : '100%',
          paddingBottom: intrinsicHeight1 ? `${intrinsicHeight1}px` : '100%',
        }}
      >
        <Image
          fill
          sizes="100%"
          priority
          src={details.sample1}
          alt="Sample 1"
        />
      </div>
      )}
      {!details.sample2 || (
      <div
        className={styles.image}
        style={{
          maxWidth: intrinsicWidth2 ? `${intrinsicWidth2}px` : '100%',
          paddingBottom: intrinsicHeight2 ? `${intrinsicHeight2}px` : '100%',
        }}
      >
        <Image
          fill
          sizes="100%"
          priority
          src={details.sample2}
          alt="Sample 2"
        />
      </div>
      )}
      {!details.sample3 || (
      <div
        className={styles.image}
        style={{
          maxWidth: intrinsicWidth3 ? `${intrinsicWidth3}px` : '100%',
          paddingBottom: intrinsicHeight3 ? `${intrinsicHeight3}px` : '100%',
        }}
      >
        <Image
          fill
          sizes="100%"
          priority
          src={details.sample3}
          alt="Sample 3"
        />
      </div>
      )}
      {!details.text_sample || (
        <div className={styles.comment}>
          <p className={styles.commentHeader}>크리에이터 코멘트</p>
          <p>{details.text_sample}</p>
        </div>
      )}
    </>
  )
}

export default ImageSample
