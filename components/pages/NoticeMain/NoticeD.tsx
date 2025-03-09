import Image from 'next/image'
import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeD.module.css'

const NoticeD = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>파트너 크리에이터 이벤트</p>
        <hr />
        <div className={styles.image} style={{ paddingBottom: '25%' }}>
          <Image fill sizes="100%" priority src="/partnerfee.png" alt="Partner Fee" />
        </div>
        <br />
        <p>파트너 크리에이터는 2026/03/09까지 중개 수수료 0%로 서비스를 이용할 수 있습니다.</p>
        <br />
        <p>크리에이터로 등록한 이메일로 간단한 자기소개와 작품 등 포트폴리오를 포함하여</p>
        <p>commicat.sup@gmail.com으로 신청해주시면 파트너 크리에이터 심사를 받으실 수 있습니다.</p>
        <p>심사 완료 결과는 이메일로 회신드립니다.</p>
        <br />
        <p>심사를 받지 않더라도 커미캣 이용만으로 파트너 크리에이터로 등록되실 수 있습니다.</p>
        <p>매월 9일, 파트너 크리에이터가 아닌 크리에이터 중</p>
        <p>누적 작업 금액이 가장 많은 크리에이터 5명, 누적 작업량이 가장 많은 크리에이터 5명</p>
        <p>총 10명의 크리에이터가 파트너 크리에이터로 등록됩니다.</p>
        <br />
        <p>본 이벤트는 파트너 크리에이터 수에 따라 연장/조기종료 될 수 있습니다.</p>
        <p>크리에이터분들의 많은 이용 부탁드립니다. 감사합니다!</p>
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeD
