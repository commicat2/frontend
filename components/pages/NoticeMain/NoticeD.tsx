import Image from 'next/image'
import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeD.module.css'

const NoticeD = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>파트너 크리에이터 이벤트</p>
        <hr className={styles.hr} />
        <div className={styles.image} style={{ paddingBottom: '25%' }}>
          <Image fill sizes="100%" priority src="/partnerfee.png" alt="Partner Fee" />
        </div>
        <br />
        <p>파트너 크리에이터는 2026/03/09까지 중개 수수료 0%로 서비스를 이용할 수 있습니다.</p>
        <br />
        <p>크리에이터로 등록한 이메일로 양식에 맞게 commicat.sup@gmail.com으로 신청해주시면,</p>
        <p>파트너 크리에이터 심사를 받으실 수 있습니다. 심사 결과는 이메일로 회신드립니다.</p>
        <br />
        <p>양식:</p>
        <p>1. 이메일</p>
        <p>2. 성함</p>
        <p>3. 작업할 유형과 카테고리</p>
        <p>4. 작업물</p>
        <br />
        <p>본 이벤트는 파트너 크리에이터 수에 따라 연장/조기종료 될 수 있습니다.</p>
        <p>크리에이터분들의 많은 이용 부탁드립니다. 감사합니다!</p>
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeD
