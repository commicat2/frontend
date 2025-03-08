'use client'

import { useMemo, useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import ImageWorkForm from './ImageWorkForm'
import AudioWorkForm from './AudioWorkForm'
import VideoWorkForm from './VideoWorkForm'
import TextWorkForm from './TextWorkForm'
import styles from './WorkFom.module.css'

const OtherWorkForm = ({ setFormData, isHidden }: { setFormData: SetState<CreateWorkRequest>, isHidden: boolean }) => {
  const genreOptions: SelectOption<GenreNumber, GenreKr>[] = useMemo(() => {
    return [
      { value: 1, label: '이미지' },
      { value: 2, label: '오디오' },
      { value: 3, label: '비디오' },
      { value: 4, label: '텍스트' },
    ]
  }, [])
  const [sampleGenre, setSampleGenre] = useState<SelectOption<GenreNumber, GenreKr>>({ value: 1, label: '이미지' })

  const handleGenreChange = (
    newValue: SingleValue<SelectOption<GenreNumber, GenreKr>>,
    actionMeta: ActionMeta<SelectOption<GenreNumber, GenreKr>>,
  ) => {
    if (actionMeta.action === 'select-option' && newValue) {
      setSampleGenre({ value: newValue.value, label: newValue.label })
      setFormData((prev) => {
        return {
          ...prev,
          sample_genre: newValue.value,
          file1: undefined,
          file2: undefined,
          file3: undefined,
          thumbnail: undefined,
          sample1: undefined,
          sample2: undefined,
          sample3: undefined,
          text_sample: undefined,
          hash_tag1: undefined,
          hash_tag2: undefined,
          hash_tag3: undefined,
        }
      })
    }
  }

  const renderForm = () => {
    switch (sampleGenre.value) {
      case 2:
        return <AudioWorkForm setFormData={setFormData} isHidden={isHidden} />
      case 3:
        return <VideoWorkForm setFormData={setFormData} isHidden={isHidden} />
      case 4:
        return <TextWorkForm setFormData={setFormData} isHidden={isHidden} />
      default:
        return <ImageWorkForm setFormData={setFormData} isHidden={isHidden} />
    }
  }

  return (
    <>
      <div className={`${styles.row} ${styles.right} ${styles.last}`}>
        <p className={styles.label}>샘플 타입:</p>
        <Select
          className={styles.select}
          name="genre"
          options={genreOptions}
          value={sampleGenre}
          onChange={handleGenreChange}
        />
      </div>
      {renderForm()}
    </>
  )
}

export default OtherWorkForm
