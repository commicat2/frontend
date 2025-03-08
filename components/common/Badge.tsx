import styles from './Badge.module.css'

const Badge = ({ option }: { option: BadgeOption }) => {
  let className = ''
  let badgeText = ''
  switch (option) {
    case 'seekRequest':
      className = styles.seekRequest
      badgeText = '모집중'
      break
    case 'seekRequestButton':
      className = styles.seekRequestButton
      badgeText = '모집중'
      break
    case 'notSeekRequest':
      className = styles.notSeekRequest
      badgeText = '모집중지'
      break
    case 'copyrightTransfer':
      className = styles.copyrightTransfer
      badgeText = '외주'
      break
    case 'hidden':
      className = styles.hidden
      badgeText = '비공개'
      break
    case 'anonymous':
      className = styles.anonymous
      badgeText = '익명'
      break
    case 'dm':
      className = styles.dm
      badgeText = 'DM'
      break
    case 'dmOptional':
      className = styles.dmOptional
      badgeText = '작업중 DM'
      break
    case 'image':
      className = styles.image
      badgeText = '이미지'
      break
    case 'audio':
      className = styles.audio
      badgeText = '오디오'
      break
    case 'video':
      className = styles.video
      badgeText = '비디오'
      break
    case 'text':
      className = styles.text
      badgeText = '텍스트'
      break
    case 'other':
      className = styles.other
      badgeText = '기타'
      break
    case 'detail':
      className = styles.detail
      badgeText = 'Detail'
      break
    case 'accept':
      className = styles.accept
      badgeText = '승인'
      break
    case 'reject':
      className = styles.reject
      badgeText = '거절'
      break
    default:
      return <span />
  }

  return <div className={`${styles.common} ${className}`}>{badgeText}</div>
}

export default Badge
