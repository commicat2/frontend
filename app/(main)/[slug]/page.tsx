import { getProfilePage } from 'lib/api/queryFunctions'
import { isValidEnglishNickname } from 'lib/utils/validators'
import NotFoundMain from 'components/pages/NotFoundMain'
import ProfilePageMain from 'components/pages/ProfilePageMain'

export const revalidate = 0

const Page = async ({ params }: { params: Slug }) => {
  const { slug } = params
  const englishNickname = slug.substring(3)
  if (!slug.startsWith('%40') || !isValidEnglishNickname(englishNickname)) return <NotFoundMain />

  try {
    const {
      id, profile, creator_profile, creator_works, client_works,
    } = await getProfilePage(englishNickname)
    return (
      <ProfilePageMain
        id={id}
        profile={profile}
        creator_profile={creator_profile}
        creator_works={creator_works}
        client_works={client_works}
      />
    )
  } catch { return <NotFoundMain /> }
}

export default Page
