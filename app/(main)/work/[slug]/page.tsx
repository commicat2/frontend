import { getWork } from 'lib/api/queryFunctions'
import { isPositiveInteger } from 'lib/utils/validators'
import NotFoundMain from 'components/pages/NotFoundMain'
import WorkMain from 'components/pages/WorkMain'

export const revalidate = 86400

const Page = async ({ params }: { params: Slug }) => {
  const id = Number(params.slug)
  if (!isPositiveInteger(id)) return <NotFoundMain />

  try {
    const { creator, client, ...details } = await getWork(id)
    return <WorkMain creator={creator} client={client} details={details} />
  } catch { return <NotFoundMain /> }
}

export default Page
