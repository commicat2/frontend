import { getElapsedTime } from 'lib/utils/common'
import styles from './NotificationCards.module.css'

const NotificationCards = ({ notifications }: { notifications: NotificationCard[] }) => {
  return (
    <div className={styles.container}>
      {notifications.map((notification) => {
        return (
          <div key={notification.id} className={styles.card}>
            <p className={styles.dt}>{getElapsedTime(notification.dt_created) || '1분 전'}</p>
            <p className={styles.content}>{notification.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default NotificationCards
