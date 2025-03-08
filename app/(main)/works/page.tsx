import { GENRE_PARAMS } from 'lib/constants'
import { getHashTags } from 'lib/api/queryFunctions'
import { isCategory } from 'lib/utils/validators'
import WorksMain from 'components/pages/WorksMain'

export const revalidate = 21

const Page = async ({ searchParams }: SearchParams) => {
  const genre = GENRE_PARAMS.includes(searchParams.genre || '') ? searchParams.genre as Genre : 'image'
  const category = isCategory(searchParams.category) ? searchParams.category as CategoryKey : ''
  const keyword = searchParams.keyword || ''
  const hashTag = searchParams.hashTag || ''
  let hashTags: string[] = []
  let genreKey = 1
  switch (genre) {
    case 'audio':
      genreKey = 2
      break
    case 'video':
      genreKey = 3
      break
    case 'text':
      genreKey = 4
      break
    case 'other':
      genreKey = 5
      break
    default:
      break
  }

  try {
    if (Number(category)) hashTags = await getHashTags(genreKey, Number(category))
    else hashTags = []
  } catch { /* ignore error */ }

  return <WorksMain genre={genre} category={category} keyword={keyword} hashTag={hashTag} hashTags={hashTags} />
}

export default Page
