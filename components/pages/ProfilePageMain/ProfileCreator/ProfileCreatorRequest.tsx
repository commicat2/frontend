import { formatNumber } from 'lib/utils/common'
import styles from './ProfileCreatorRequest.module.css'

const ProfileCreatorRequest = ({
  min_amount,
  response_total_days,
  response_total,
  complete_total_days,
  complete_total,
  expire_total,
  response_expiration_days,
  complete_expiration_days,
}: {
  min_amount: number
  response_total_days: number
  response_total: number
  complete_total_days: number
  complete_total: number
  expire_total: number
  response_expiration_days: number
  complete_expiration_days: number
}) => {
  let averageResponseDays = 0
  if (response_total) {
    averageResponseDays = Math.floor(response_total_days / response_total)
    if (averageResponseDays < 1) averageResponseDays = 1
  }
  let averageCompleteDays = 0
  if (complete_total) {
    averageCompleteDays = Math.floor(complete_total_days / complete_total)
    if (averageCompleteDays < 1) averageCompleteDays = 1
  }
  let completeRate: number | null = null
  if (complete_total + expire_total) {
    completeRate = (complete_total * 100) / (complete_total + expire_total)
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.row}>
          <p>최소 금액:</p>
          <p>{`${formatNumber(min_amount)}원`}</p>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row}>
          <p>평균 응답일:</p>
          <p>{`${averageResponseDays ? formatNumber(averageResponseDays) : '- '}일`}</p>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row}>
          <p>평균 작업 완료일:</p>
          <p>{`${averageCompleteDays ? formatNumber(averageCompleteDays) : '- '}일`}</p>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row}>
          <p>응답 기한:</p>
          <p>{`${formatNumber(response_expiration_days)}일`}</p>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row}>
          <p>작업 완료 기한:</p>
          <p>{`${formatNumber(complete_expiration_days)}일`}</p>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row}>
          <p>작업 완료율:</p>
          <p>{`${completeRate !== null ? completeRate?.toFixed(0) : '- '}%`}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCreatorRequest
