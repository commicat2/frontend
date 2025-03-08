import { jwtDecode } from 'jwt-decode'
import { JwtPayloadWithId } from 'lib/JwtPayloads'
import {
  IMAGE_CATEGORY,
  AUDIO_CATEGORY,
  VIDEO_CATEGORY,
  TEXT_CATEGORY,
  OTHER_CATEGORY,
  IMAGE_CATEGORY_NUMBER,
  AUDIO_CATEGORY_NUMBER,
  VIDEO_CATEGORY_NUMBER,
  TEXT_CATEGORY_NUMBER,
  OTHER_CATEGORY_NUMBER,
} from 'lib/constants'

export const userIdFromJas = () => {
  const unparsedJas = localStorage.getItem('jas')
  const jas = unparsedJas ? JSON.parse(unparsedJas) as string : ''
  if (!jas) return 0
  const { user_id } = jwtDecode<JwtPayloadWithId>(jas)
  if (!user_id) return 0
  return user_id
}

const getOptionsByGenre = (genre: Genre) => {
  switch (genre) {
    case 'image': return IMAGE_CATEGORY
    case 'audio': return AUDIO_CATEGORY
    case 'video': return VIDEO_CATEGORY
    case 'text': return TEXT_CATEGORY
    case 'other': return OTHER_CATEGORY
    default: return [{ value: '0', label: 'Select...' }]
  }
}
const getNumberOptionsByGenre = (genre: Genre) => {
  switch (genre) {
    case 'image': return IMAGE_CATEGORY_NUMBER
    case 'audio': return AUDIO_CATEGORY_NUMBER
    case 'video': return VIDEO_CATEGORY_NUMBER
    case 'text': return TEXT_CATEGORY_NUMBER
    case 'other': return OTHER_CATEGORY_NUMBER
    default: return [{ value: 0, label: 'Select...' }]
  }
}

export const categoryToOptions = ({ categories, genre }: { categories?: string[], genre: Genre }) => {
  if (!categories?.length) return []
  const options = getOptionsByGenre(genre)
  return categories.map((category: string) => {
    const option = options.find((item) => { return item.value === category })
    return option
  }).filter(Boolean) as SelectOption<CategoryKey, Category>[]
}

export const categoryToNumberOptions = ({ categories, genre }: { categories?: string[], genre: Genre }) => {
  if (!categories?.length) return []
  const options = getNumberOptionsByGenre(genre)
  return categories.map((category) => {
    const option = options.find((item) => { return item.value === parseInt(category, 36) })
    return option
  }).filter(Boolean) as SelectOption<CategoryNumber, Category>[]
}

export const sortCategories = (categories: string[]) => {
  return categories.sort((a, b) => { return a.localeCompare(b) })
}

export const getElapsedTime = (date: string) => {
  if (date) {
    const createdDate = new Date(date)
    const nowDate = new Date()
    const timeDiff = nowDate.getTime() - createdDate.getTime()

    const MS_PER_MINUTE = 1000 * 60
    const MS_PER_HOUR = MS_PER_MINUTE * 60
    const MS_PER_DAY = MS_PER_HOUR * 24
    const MS_PER_MONTH = MS_PER_DAY * 30
    const MS_PER_YEAR = MS_PER_DAY * 365

    const timeUnits = [
      { value: MS_PER_YEAR, label: '년' },
      { value: MS_PER_MONTH, label: '달' },
      { value: MS_PER_DAY, label: '일' },
      { value: MS_PER_HOUR, label: '시간' },
      { value: MS_PER_MINUTE, label: '분' },
    ]

    for (let i = 0; i < timeUnits.length; i += 1) {
      const { value, label } = timeUnits[i]
      if (timeDiff >= value) {
        const formattedTimeDiff = Math.floor(timeDiff / value)
        return `${formattedTimeDiff}${label} 전`
      }
    }
  }
  return ''
}

export const formatDate = (date?: string) => {
  if (!date) return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  return new Date(date).toLocaleString('ko-KR', options)
}

export const formatNumber = (num: number) => {
  if (Number.isNaN(num)) return '0'
  let roundedNum = num.toFixed(2)
  const decimalPart = Math.round((num - Math.floor(num)) * 100)
  if (decimalPart === 0) roundedNum = num.toFixed(0)
  else if (decimalPart % 10 === 0) roundedNum = num.toFixed(1)
  return new Intl.NumberFormat().format(Number(roundedNum))
}

export const createQueryString = (params: Record<string, string | undefined>) => {
  return Object.entries(params)
    .filter(([, value]) => { return value !== undefined && value !== '' })
    .map(([key, value]) => { return `${encodeURIComponent(key)}=${encodeURIComponent(value || '')}` })
    .join('&')
}

export const getLabelByValue = ({ categories, value }: {
  categories: Readonly<SelectOption<CategoryKey, Category>[]>
  value: string
}) => {
  const element = categories.find((category) => { return category.value === value })
  return element?.label
}

export const getFileName = (url: string) => {
  const fileName = url.split('/').pop()
  if (!fileName) return ''
  if (fileName.length > 20) {
    return `${fileName.slice(0, 20)}....${fileName.split('.').pop()}`
  }
  return fileName
}
