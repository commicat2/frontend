import { isPositiveInteger } from 'lib/utils/validators'
import NotFoundMain from 'components/pages/NotFoundMain'
import NoticeMain from 'components/pages/NoticeMain'

export const metadata = { title: '공지사항 | Commicat' }

const Page = ({ params }: { params: Slug }) => {
  const id = Number(params.slug)
  if (!isPositiveInteger(id) && id > 4) return <NotFoundMain />
  return <NoticeMain id={id} />
}

export default Page
