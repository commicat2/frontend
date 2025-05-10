import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeD.module.css'

const NoticeD = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>커미캣 서비스 종료 안내</p>
        <hr className={styles.hr} />
        <br />
        <p>커미캣 서비스는 2025년 5월 14일 부로 서비스가 종료됩니다.</p>
        <br />
        <p>그동안의 많은 관심에 감사드리며, 서비스를 지속하지 못하게 된 점에 죄송한 마음을 느낍니다.</p>
        <br />
        <p>* 작업중인 리퀘스트가 있는 크리에이터, 클라이언트는 전송된 메일을 확인해주세요.</p>
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeD
