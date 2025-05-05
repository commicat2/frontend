import Image from 'next/image'
import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeC.module.css'

const NoticeC = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>클라이언트 이용 가이드</p>
        <hr className={styles.hr} />
        <p>1. 회원가입 후, 우측 상단의 아이콘을 통해 설정 페이지로 이동해주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide1.png" alt="Guide 1" />
        </div>
        <br />
        <p>2. 프로필 설정 페이지에서 아이디, 닉네임 등을 설정한 후 저장해주세요.</p>
        <div className={styles.image2}>
          <Image fill sizes="100%" priority src="/guide2.png" alt="Guide 2" />
        </div>
        <p className={styles.comment}>&emsp;- 아이디: 본인의 프로필 페이지의 주소에 사용되는 식별자</p>
        <p className={styles.comment}>&emsp;- 닉네임: 외부에 노출되는 회원님의 별칭</p>
        <p className={styles.comment}>&emsp;- 사진: 외부에 노출되는 회원님의 프로필 이미지</p>
        <p className={styles.comment}>&emsp;- 배경: 본인의 프로필 페이지 상단에 노출되는 배경 이미지</p>
        <p className={styles.comment}>&emsp;- 소개: 본인의 프로필 페이지에 노출되는 자기소개</p>
        <p className={styles.comment}>&emsp;- X 링크: 본인의 X(트위터) 링크</p>
        <br />
        <p>3. 이메일 인증 후, 입금/환불에 사용할 예금주명, 은행이름, 계좌번호를 등록해주세요.</p>
        <div className={styles.image2}>
          <Image fill sizes="100%" priority src="/guide3.png" alt="Guide 3" />
        </div>
        <p className={styles.comment}>&emsp;a. 이메일: 로그인 시 사용됩니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 인증 전에는 대부분의 서비스를 이용할 수 없습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 이메일 변경 후에는 다시 이메일 인증을 진행해야합니다.</p>
        <p className={styles.comment}>&emsp;b. 작업 진행 상황, 결제 등의 알림을 이메일로도 받을 수 있습니다.</p>
        <p className={styles.comment}>&emsp;c. 클라이언트로서 입금 및 환불 처리, 크리에이터로서 작업 대금 지급에 이용되는 계좌 정보</p>
        <br />
        <p>4. 원하는 크리에이터 프로필 페이지에서 작업을 요청해주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide12.png" alt="Guide 12" />
        </div>
        <p className={styles.comment}>&emsp;a. 모집중: 모집중일때만 요청 가능합니다.</p>
        <p className={styles.comment}>&emsp;b. 외주: 저작재산권을 받는 외주 유형의 요청을 허용합니다.</p>
        <p className={styles.comment}>&emsp;c. 비공개: 상세페이지가 제공되지 않는 요청을 허용합니다.</p>
        <p className={styles.comment}>&emsp;d. 익명: 클라이언트가 공개되지 않는 요청을 허용합니다.</p>
        <p className={styles.comment}>&emsp;e. DM: DM을 허용합니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 작업중 DM: 클라이언트가 요청한 작업이 작업중 상태일 때만 DM을 허용합니다.</p>
        <p className={styles.comment}>&emsp;f. 작업 요청 버튼</p>
        <p className={styles.comment}>&emsp;g. DM 전송 버튼</p>
        <p className={styles.comment}>&emsp;h. 크리에이터의 작업 목록</p>
        <p className={styles.comment}>&emsp;i. 크리에이터 소개</p>
        <p className={styles.comment}>&emsp;j. 클라이언트로서 요청한 작업 목록</p>
        <p className={styles.comment}>&emsp;k. 비공개가 아닌 작업들을 볼 수 있습니다.</p>
        <br />
        <p>5. 요청 내용을 전달해주세요.</p>
        <div className={styles.image2}>
          <Image fill sizes="100%" priority src="/guide13.png" alt="Guide 13" />
        </div>
        <p className={styles.comment}>&emsp;* 작업을 요청하기 전에 이메일 인증, 아이디, 닉네임, 계좌 정보 등록이 필요합니다.</p>
        <p className={styles.comment}>&emsp;a. 작업의 카테고리</p>
        <p className={styles.comment}>&emsp;b. 작업 요청 내용</p>
        <p className={styles.comment}>&emsp;&emsp;* 비공개 요청이 아닌 경우 요청 내용이 상세 페이지에 공개됩니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 파일 전달이 필요한 경우, 외부 링크를 활용해주세요.</p>
        <p className={styles.comment}>&emsp;&emsp;* 가능한 한 모든 요청 사항을 자세히 전달해주세요.</p>
        <p className={styles.comment}>&emsp;c. 크리에이터가 설정한 최소 금액 이상으로 요청 금액을 설정해주세요.</p>
        <p className={styles.comment}>&emsp;d. 작업 유형</p>
        <br />
        <p>6. 요청 완료 후, 응답 기한까지 크리에이터의 응답을 기다려주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide14.png" alt="Guide 14" />
        </div>
        <p className={styles.comment}>&emsp;a. 요청의 유형입니다.</p>
        <p className={styles.comment}>&emsp;b. 요청이 생성된 날짜입니다.</p>
        <p className={styles.comment}>&emsp;c. 작업의 번호입니다.</p>
        <p className={styles.comment}>&emsp;d. 요청의 카테고리와 내용입니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 요청의 내용또한 공개 유형일 경우 외부에 공개됩니다.</p>
        <p className={styles.comment}>&emsp;e. 클라이언트가 지불할 작업의 결제 금액입니다.</p>
        <p className={styles.comment}>&emsp;f. 작업 요청 승인 후 결제가 완료된 시점부터 계산되는 완료 기한 일수입니다.</p>
        <p className={styles.comment}>&emsp;g. 요청의 승인/거절 응답 기한입니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 응답 기한이 지날 경우, 요청은 자동으로 거절됩니다.</p>
        <br />
        <p>7. 요청이 승낙됐다면, 5일 내로 결제를 진행해주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide15.png" alt="Guide 15" />
        </div>
        <p className={styles.comment}>&emsp;a. 입금 기한까지 예금주명과 동일한 이름과 정확한 입금 금액으로 입금 계좌에 입금해주세요.</p>
        <p className={styles.comment}>&emsp;* 반복적으로 입금 기한을 넘길 경우, 서비스 이용제한 될 수 있습니다.</p>
        <br />
        <p>8. 크리에이터가 작업을 완료할 때까지 기다려주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide7.png" alt="Guide 7" />
        </div>
        <p className={styles.comment}>&emsp;* 작업 완료 기한이 지났을 경우, 요청이 취소되고 입금 금액은 자동으로 환불됩니다.</p>
        <br />
        <p>9. 작업이 완료됐다면, 요청의 완료 탭에서 파일을 수령해주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide9.png" alt="Guide 9" />
        </div>
        <p className={styles.comment}>&emsp;* 완료 상태 작업 페이지에서 클라이언트/크리에이터는 파일을 다운로드할 수 있습니다.</p>
        <p className={styles.comment}>&emsp;* 비공개 요청이 아니라면 상세 페이지의 링크를 확인할 수 있습니다.</p>
        <br />
        <p>10. 비공개 요청이 아니라면, 상세 페이지가 게시됩니다.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide10.png" alt="Guide 10" />
        </div>
        <p className={styles.comment}>&emsp;* 비공개 요청이 아니라면, 본인의 프로필 페이지의 요청한 작업 목록에 완료된 작업이 추가됩니다.</p>
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeC
