import Link from 'next/link'
import {
  GENRE_PARAMS, IMAGE_CATEGORY, AUDIO_CATEGORY, VIDEO_CATEGORY, TEXT_CATEGORY, OTHER_CATEGORY,
} from 'lib/constants'
import { getLabelByValue, formatNumber, formatDate } from 'lib/utils/common'
import Badge from 'components/common/Badge'
import styles from './BaseRequestCard.module.css'

const BaseRequestCard = ({ request, expirationLabel = '' }: { request: CommicatRequest, expirationLabel?: string }) => {
  const genre = GENRE_PARAMS[request.genre - 1]
  let category: Category | undefined
  switch (genre) {
    case 'image':
      category = getLabelByValue({ categories: IMAGE_CATEGORY, value: request.category })
      break
    case 'audio':
      category = getLabelByValue({ categories: AUDIO_CATEGORY, value: request.category })
      break
    case 'video':
      category = getLabelByValue({ categories: VIDEO_CATEGORY, value: request.category })
      break
    case 'text':
      category = getLabelByValue({ categories: TEXT_CATEGORY, value: request.category })
      break
    case 'other':
      category = getLabelByValue({ categories: OTHER_CATEGORY, value: request.category })
      break
    default:
      break
  }

  let creatorNickname: React.ReactNode
  if (!request.creator?.english_nickname) {
    creatorNickname = <span className={styles.nickname}>{request.creator?.nickname}</span>
  } else {
    creatorNickname = (
      <Link
        className={styles.nicknameHover}
        target="_blank"
        href={`/@${request.creator?.english_nickname}`}
        prefetch={false}
      >
        {request.creator?.nickname}
      </Link>
    )
  }

  let clientNickname: React.ReactNode
  switch (true) {
    case (request.anonymous):
      clientNickname = <span className={styles.nickname}>익명</span>
      break
    case (!request.client?.english_nickname):
      clientNickname = <span className={styles.nickname}>{request.client?.nickname}</span>
      break
    default:
      clientNickname = (
        <Link
          className={styles.nicknameHover}
          target="_blank"
          href={`/@${request.client?.english_nickname}`}
          prefetch={false}
        >
          {request.client?.nickname}
        </Link>
      )
      break
  }
  return (
    <div className={styles.container}>
      <p className={styles.dt}>{request.dt_created.split('T')[0]}</p>
      <div className={styles.badgeContainer}>
        {!genre || <Badge option={genre as BadgeOption} />}
        {!request.copyright_transfer || <Badge option="copyrightTransfer" />}
        {!request.hidden || <Badge option="hidden" />}
        {!request.anonymous || <Badge option="anonymous" />}
      </div>
      <p className={styles.id}>{`#${request.id}`}</p>
      <div className={styles.row}>
        <p className={styles.label}>카테고리:</p>
        <p className={styles.output}>{category}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.label}>내용:</p>
        <textarea
          className={styles.content}
          value={request.content}
          disabled
        />
      </div>
      <div className={styles.row}>
        <p className={styles.label}>금액:</p>
        <p className={styles.output}>{`${!request.amount ? '-' : formatNumber(request.amount)}원`}</p>
      </div>
      {!request.dt_expiration || (
        <div className={styles.row}>
          <p className={styles.label}>마감 일수:</p>
          <p className={styles.output}>{`${!request.complete_expiration_days ? '-' : formatNumber(request.complete_expiration_days)}일`}</p>
        </div>
      )}
      {!request.dt_expiration || (
        <div className={styles.row}>
          <p className={styles.label}>{expirationLabel}</p>
          <p className={styles.output}>{formatDate(request.dt_expiration)}</p>
        </div>
      )}
      {!request.expiration_reason || (
        <div className={styles.row}>
          <p className={styles.label}>취소 사유:</p>
          <p className={styles.output}>{request.expiration_reason}</p>
        </div>
      )}
      <div>
        <div className={styles.nicknameContainer}>
          <span>크리에이터: </span>
          {creatorNickname}
        </div>
        <div className={styles.nicknameContainer}>
          <span>클라이언트: </span>
          {clientNickname}
        </div>
      </div>
    </div>
  )
}

export default BaseRequestCard
