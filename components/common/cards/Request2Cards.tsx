import { formatNumber, formatDate } from 'lib/utils/common'
import BaseRequestCard from './BaseRequestCard'
import styles from './BaseRequestCards.module.css'

const Request2Cards = ({ requests, isClient }: {
  requests: CommicatRequest[], isClient?: boolean
}) => {
  return (
    <div className={styles.container}>
      {requests.map((request) => {
        return (
          <div key={request.id} className={styles.card}>
            <BaseRequestCard request={request} expirationLabel="결제 기한:" />
            {!isClient || (
              <div className={styles.bankInfo}>
                <h3>입금 정보</h3>
                <p>입금 계좌: 기업은행 954-038337-01-010 박지석</p>
                <p>{`입금 금액: ${!request.amount ? '-' : formatNumber(request.amount)}원`}</p>
                <p>{`입금 기한: ${!request.dt_expiration ? '- 일' : formatDate(request.dt_expiration)}`}</p>
                <p>{`입금자명: ${request.client?.bank_account_name}`}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Request2Cards
