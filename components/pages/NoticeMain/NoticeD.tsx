import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeD.module.css'

const NoticeD = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>파트너 크리에이터 이벤트 (~09.09)</p>
        <hr />
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeD
