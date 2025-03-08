import BaseRequestCard from './BaseRequestCard'
import styles from './BaseRequestCards.module.css'

const Request5Cards = ({ requests }: { requests: CommicatRequest[] }) => {
  return (
    <div className={styles.container}>
      {requests.map((request) => {
        return (
          <div key={request.id} className={styles.card}>
            <BaseRequestCard request={request} />
          </div>
        )
      })}
    </div>
  )
}

export default Request5Cards
