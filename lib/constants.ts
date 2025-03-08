export const GENRE_MAP: Readonly<Record<Genre, GenreKey>> = {
  all: '0',
  image: '1',
  audio: '2',
  video: '3',
  text: '4',
  other: '5',
}

export const GENRE_PARAMS: Readonly<string[]> = ['image', 'audio', 'video', 'text', 'other']

export const ALLOW_DM_OPTIONS: Readonly<SelectOption<DmNumber, DmOption>[]> = [
  { value: 0, label: '비허용' },
  { value: 1, label: '작업중에만 허용' },
  { value: 2, label: '허용' },
] as const

export const ALLOW_DM_OPTIONS_ARRAY: Readonly<DmOption[]> = [
  '비허용',
  '작업중에만 허용',
  '허용',
]

export const IMAGE_CATEGORY: Readonly<SelectOption<CategoryKey, ImageCategory>[]> = [
  { value: '1', label: '일러스트' },
  { value: '2', label: '2D 버츄얼' },
  { value: '3', label: '3D 버츄얼' },
  { value: '4', label: '리깅' },
  { value: '5', label: '디자인' },
  { value: '6', label: '원화' },
  { value: '7', label: 'CG' },
  { value: '8', label: 'GIF' },
  { value: '9', label: '피드백' },
  { value: 'A', label: '만화' },
  { value: 'B', label: '리터칭' },
  { value: 'C', label: '사진' },
  { value: 'Z', label: '기타(이미지)' },
]
export const IMAGE_CATEGORY_NUMBER: Readonly<SelectOption<CategoryNumber, ImageCategory>[]> = [
  { value: 1, label: '일러스트' },
  { value: 2, label: '2D 버츄얼' },
  { value: 3, label: '3D 버츄얼' },
  { value: 4, label: '리깅' },
  { value: 5, label: '디자인' },
  { value: 6, label: '원화' },
  { value: 7, label: 'CG' },
  { value: 8, label: 'GIF' },
  { value: 9, label: '피드백' },
  { value: 10, label: '만화' },
  { value: 11, label: '리터칭' },
  { value: 12, label: '사진' },
  { value: 35, label: '기타(이미지)' },
]
export const AUDIO_CATEGORY: Readonly<SelectOption<CategoryKey, AudioCategory>[]> = [
  { value: '1', label: '음악' },
  { value: '2', label: '음향' },
  { value: '3', label: '믹싱' },
  { value: '4', label: '보이스' },
  { value: '5', label: '더빙' },
  { value: 'Z', label: '기타(오디오)' },
]
export const AUDIO_CATEGORY_NUMBER: Readonly<SelectOption<CategoryNumber, AudioCategory>[]> = [
  { value: 1, label: '음악' },
  { value: 2, label: '음향' },
  { value: 3, label: '믹싱' },
  { value: 4, label: '보이스' },
  { value: 5, label: '더빙' },
  { value: 35, label: '기타(오디오)' },
]
export const VIDEO_CATEGORY: Readonly<SelectOption<CategoryKey, VideoCategory>[]> = [
  { value: '1', label: '영상편집' },
  { value: '2', label: '모션그래픽' },
  { value: '3', label: '애니메이션' },
  { value: 'Z', label: '기타(비디오)' },
]
export const VIDEO_CATEGORY_NUMBER: Readonly<SelectOption<CategoryNumber, VideoCategory>[]> = [
  { value: 1, label: '영상편집' },
  { value: 2, label: '모션그래픽' },
  { value: 3, label: '애니메이션' },
  { value: 35, label: '기타(비디오)' },
]
export const TEXT_CATEGORY: Readonly<SelectOption<CategoryKey, TextCategory>[]> = [
  { value: '1', label: '소설' },
  { value: '2', label: '시나리오' },
  { value: '3', label: '작사' },
  { value: '4', label: '번역' },
  { value: '5', label: '피드백' },
  { value: 'Z', label: '기타(텍스트)' },
]
export const TEXT_CATEGORY_NUMBER: Readonly<SelectOption<CategoryNumber, TextCategory>[]> = [
  { value: 1, label: '소설' },
  { value: 2, label: '시나리오' },
  { value: 3, label: '작사' },
  { value: 4, label: '번역' },
  { value: 5, label: '피드백' },
  { value: 35, label: '기타(텍스트)' },
]
export const OTHER_CATEGORY: Readonly<SelectOption<CategoryKey, OtherCategory>[]> = [
  { value: '1', label: 'AI 컨텐츠' },
  { value: '2', label: '프로그래밍' },
  { value: '3', label: '코드 리뷰' },
  { value: 'Z', label: '기타' },
]
export const OTHER_CATEGORY_NUMBER: Readonly<SelectOption<CategoryNumber, OtherCategory>[]> = [
  { value: 1, label: 'AI 컨텐츠' },
  { value: 2, label: '프로그래밍' },
  { value: 3, label: '코드 리뷰' },
  { value: 35, label: '기타' },
]
