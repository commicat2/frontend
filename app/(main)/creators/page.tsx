import { GENRE_PARAMS } from 'lib/constants'
import { isCategory } from 'lib/utils/validators'
import CreatorsMain from 'components/pages/CreatorsMain'

const Page = ({ searchParams }: SearchParams) => {
  const genre = GENRE_PARAMS.includes(searchParams.genre || '') ? searchParams.genre as Genre : 'all'
  const category = isCategory(searchParams.category) ? searchParams.category as CategoryKey : ''
  const seek_request = searchParams.seek_request ? 'true' : ''
  const keyword = searchParams.keyword || ''
  return <CreatorsMain genre={genre} category={category} seek_request={seek_request} keyword={keyword} />
}

export default Page
