import { getHomePage } from 'lib/api/queryFunctions'
import HomePageMain from 'components/pages/HomePageMain'
import HomePageHeader from 'components/pages/HomePageHeader'

export const revalidate = 21

const Page = async () => {
  let image_works: WorkThumbnail[] = []
  let audio_works: WorkThumbnail[] = []
  let video_works: WorkThumbnail[] = []
  let text_works: WorkThumbnail[] = []
  let other_works: WorkThumbnail[] = []
  let creators: CreatorCard[] = []
  let users: UserCard[] = []

  try {
    const data = await getHomePage()
    if (data) {
      image_works = data.image_works || []
      audio_works = data.audio_works || []
      video_works = data.video_works || []
      text_works = data.text_works || []
      other_works = data.other_works || []
      creators = data.creators || []
      users = data.users || []
    }
  } catch { /* ignore error */ }

  return (
    <>
      <HomePageHeader />
      <HomePageMain
        image_works={image_works}
        audio_works={audio_works}
        video_works={video_works}
        text_works={text_works}
        other_works={other_works}
        creators={creators}
        users={users}
      />
    </>
  )
}

export default Page
