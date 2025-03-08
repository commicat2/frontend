'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getEnglishNickname } from 'lib/api/queryFunctions'
import Badge from 'components/common/Badge'
import styles from './WorkContent.module.css'

const WorkContent = ({ creator, client, content }: { creator: WorkCreator, client: WorkClient, content: string }) => {
  const router = useRouter()
  const redirectProfilePage = async (id: number) => {
    try {
      const { english_nickname } = await getEnglishNickname(id)
      router.push(`/@${english_nickname}`)
    } catch { /* ignore error */ }
  }

  const renderCreatorNickname = () => {
    if (!creator.id) return <span className={styles.nickname}>{creator.nickname}</span>
    return (
      <button
        className={styles.nicknameHover}
        type="button"
        onClick={() => { redirectProfilePage(creator.id) }}
      >
        {creator.nickname}
      </button>
    )
  }

  const renderClientNickname = () => {
    if (!client.nickname) return <span className={styles.nickname}>익명</span>
    if (!client.id) return <span className={styles.nickname}>{client.nickname}</span>
    return (
      <button
        className={styles.nicknameHover}
        type="button"
        onClick={() => { redirectProfilePage(client.id) }}
      >
        {client.nickname}
      </button>
    )
  }

  return (
    <>
      <div className={styles.top}>
        <div className={styles.creator}>
          <div className={styles.profilePic}>
            <Image
              fill
              sizes="100%"
              priority
              src={creator.profile_pic || '/default_profile_pic.jpg'}
              alt="Creator Profile"
            />
          </div>
          <div>
            <span>크리에이터: </span>
            {renderCreatorNickname()}
          </div>
          {!creator.seek_request || <Badge option="seekRequest" />}
        </div>
        <div className={styles.content}>{content}</div>
      </div>
      <div>
        <span>클라이언트: </span>
        {renderClientNickname()}
      </div>
    </>
  )
}

export default WorkContent
