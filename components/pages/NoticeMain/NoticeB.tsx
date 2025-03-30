import Image from 'next/image'
import NoticeMainContainer from 'components/common/NoticeMainContainer'
import styles from './NoticeB.module.css'

const NoticeB = () => {
  return (
    <NoticeMainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>크리에이터 이용 가이드</p>
        <hr className={styles.hr} />
        <p>1. 회원가입 후, 우측 상단의 아이콘을 통해 설정 페이지로 이동해주세요.</p>
        <div className={styles.image}>
          <Image fill sizes="100%" priority src="/guide1.png" alt="Guide 1" />
        </div>
        <br />
        <p>2. 프로필 설정 페이지에서 아이디, 닉네임 등을 설정한 후 저장해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '64.5%' }}>
          <Image fill sizes="100%" priority src="/guide2.png" alt="Guide 2" />
        </div>
        <p className={styles.comment}>&emsp;- 아이디: 본인의 프로필 페이지의 주소에 사용되는 식별자</p>
        <p className={styles.comment}>&emsp;- 닉네임: 외부에 노출되는 회원님의 별칭</p>
        <p className={styles.comment}>&emsp;- 사진: 외부에 노출되는 회원님의 프로필 이미지</p>
        <p className={styles.comment}>&emsp;- 배경: 본인의 프로필 페이지 상단에 노출되는 배경 이미지</p>
        <p className={styles.comment}>&emsp;- 소개: 본인의 프로필 페이지에 노출되는 자기소개</p>
        <p className={styles.comment}>&emsp;&emsp;* 소개란에 본인이 작업할 수 있는 유형이나 가격을 명시할 수 있습니다.</p>
        <p className={styles.comment}>&emsp;- X 링크: 본인의 X(트위터) 링크</p>
        <p className={styles.comment}>&emsp;&emsp;* 본인의 X 계정 자기소개에 본인의 커미캣 프로필 페이지 주소를 적어놓아야 수수료 혜택을 받을 수 있습니다.</p>
        <br />
        <p>3. 이메일 인증 후, 작업 대금을 지급받을 예금주명, 은행이름, 계좌번호를 등록해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '42%' }}>
          <Image fill sizes="100%" priority src="/guide3.png" alt="Guide 3" />
        </div>
        <p className={styles.comment}>&emsp;a. 이메일: 로그인 시 사용됩니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 인증 전에는 대부분의 서비스를 이용할 수 없습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 이메일 변경 후에는 다시 이메일 인증을 진행해야합니다.</p>
        <p className={styles.comment}>&emsp;b. 작업 진행 상황, 결제 등의 알림을 이메일로도 받을 수 있습니다.</p>
        <p className={styles.comment}>&emsp;c. 프로필과 계정 설정 후, 누구나 크리에이터로 등록하실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* NICE평가정보 개인실명확인 서비스로 신원을 확인합니다.</p>
        <p className={styles.comment}>&emsp;d. 크리에이터로서 작업 대금 지급, 클라이언트로서 입금 및 환불 처리에 이용되는 계좌 정보</p>
        <br />
        <p>4. 크리에이터 등록 후, 크리에이터 설정을 완료해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '66.2%' }}>
          <Image fill sizes="100%" priority src="/guide4.png" alt="Guide 4" />
        </div>
        <p className={styles.comment}>&emsp;a. 프로필에 등록한 X 계정 자기소개에 본인의 프로필 페이지 주소를 적고 체크하시면 5%의 수수료로 이용하실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 허위 기재시 수수료 혜택을 받지 못하실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 수수료 혜택 없이도 7%의 수수료로 서비스를 이용하실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;b. 작업 요청을 받을 수 있는 상태를 결정합니다.</p>
        <p className={styles.comment}>&emsp;c. 외주 유형의 요청도 허용합니다.</p>
        <p className={styles.comment}>&emsp;d. 비공개 유형의 요청도 허용합니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 비공개만 허용 체크시 비공개 유형의 요청만 허용합니다.</p>
        <p className={styles.comment}>&emsp;e. 클라이언트가 익명인 요청도 허용합니다.</p>
        <p className={styles.comment}>&emsp;f. dm을 받을 수 있는 상태를 결정합니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 항상 허용시 dm을 언제나 받을 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 작업중 허용시 요청이 작업중 상태일 때만 dm을 주고받을 수 있습니다.</p>
        <p className={styles.comment}>&emsp;g. 프로필 페이지에 게시되는 자기소개서</p>
        <p className={styles.comment}>&emsp;&emsp;* 이미지 최대 10장, 유튜브 링크 등을 활용할 수 있습니다.</p>
        <p className={styles.comment}>&emsp;h. 전달할 작업물의 유형</p>
        <p className={styles.comment}>&emsp;i. 요청 받을 카테고리</p>
        <p className={styles.comment}>&emsp;j. 작업 요청의 최소 금액</p>
        <p className={styles.comment}>&emsp;k. 작업 요청의 승인/거절 응답 기한</p>
        <p className={styles.comment}>&emsp;l. 작업 요청 승인 후 결제가 완료된 시점부터 계산되는 완료 기한</p>
        <br />
        <p>5. 작업 상태, 알림, dm 등은 사이트 상단에서 확인할 수 있습니다. 작업 요청이 들어올 경우, b를 눌러 작업 페이지로 이동해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '46.5%' }}>
          <Image fill sizes="100%" priority src="/guide5.png" alt="Guide 5" />
        </div>
        <p className={styles.comment}>&emsp;a. 작업 요청이 들어오거나 요청의 상태가 변경될 때, 그리고 기타 알림 사항이 있을 때 받는 알림 페이지</p>
        <p className={styles.comment}>&emsp;&emsp;* 계정 설정을 통해 알림을 메일로도 받으실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;b. 작업 요청들을 확인할 수 있는 페이지.</p>
        <p className={styles.comment}>&emsp;c. dm 페이지</p>
        <p className={styles.comment}>&emsp;&emsp;* dm은 반드시 작업과 관련된 내용만 주고받아야 합니다.</p>
        <br />
        <p>6. 승인대기 상태의 요청을 처리해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '61.4%' }}>
          <Image fill sizes="100%" priority src="/guide6.png" alt="Guide 6" />
        </div>
        <p className={styles.comment}>&emsp;a. 요청의 유형</p>
        <p className={styles.comment}>&emsp;b. 요청이 생성된 날짜</p>
        <p className={styles.comment}>&emsp;c. 작업의 번호</p>
        <p className={styles.comment}>&emsp;d. 요청의 카테고리와 내용</p>
        <p className={styles.comment}>&emsp;&emsp;* 요청의 내용또한 공개 유형일 경우 외부에 공개됩니다.</p>
        <p className={styles.comment}>&emsp;e. 클라이언트가 지불할 작업의 결제 금액</p>
        <p className={styles.comment}>&emsp;&emsp;* 작업 완료 후, 크리에이터는 이 금액에서 중개 수수료를 뺀 금액을 대금으로 지급받습니다.</p>
        <p className={styles.comment}>&emsp;f. 작업 요청 승인 후 결제가 완료된 시점부터 계산되는 완료 기한 일수</p>
        <p className={styles.comment}>&emsp;g. 요청의 승인/거절 응답 기한</p>
        <p className={styles.comment}>&emsp;&emsp;* 응답 기한이 지날 경우, 요청은 자동으로 거절됩니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 거절 시, 거절 사유를 전달할 수도 있고, 적지 않을 수도 있습니다.</p>
        <br />
        <p>7. 승인 후 클라이언트의 결제를 기다려주세요.</p>
        <p className={styles.comment}>&emsp;* 결제 기한은 응답한 시점부터 3일 후 까지입니다.</p>
        <p className={styles.comment}>&emsp;* 반복적으로 입금 기한을 넘기는 클라이언트는 서비스 이용제한 될 수 있습니다.</p>
        <br />
        <p>8. 입금 처리가 됐을 경우 요청 내용에 맞게 작업 완료 기한 전까지 작업물을 완성해주세요.</p>
        <p className={styles.comment}>&emsp;* 비공개 요청이 아니라면 상세 페이지에 등록될 샘플 파일들도 준비해주세요.</p>
        <p className={styles.comment}>&emsp;* 작업 완료 기한이 지났을 경우, 요청이 취소되고 프로필 페이지의 작업 완료율이 내려갑니다.</p>
        <div className={styles.image} style={{ paddingBottom: '63%' }}>
          <Image fill sizes="100%" priority src="/guide7.png" alt="Guide 7" />
        </div>
        <p className={styles.comment}>&emsp;* 작업중 상태의 카드를 클릭하면 작업 완료를 위한 양식이 열립니다.</p>
        <div className={styles.image} style={{ paddingBottom: '63%' }}>
          <Image fill sizes="100%" priority src="/guide8.png" alt="Guide 8" />
        </div>
        <p className={styles.comment}>&emsp;a. 요청한 클라이언트에게 전달할 파일들</p>
        <p className={styles.comment}>&emsp;&emsp;* 요청 내용에 부합한다면 형식은 상관 없습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 열리지 않거나 빈 파일이거나 요청 내용과 너무나 상이한 경우 환불처리될 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 용량이 너무 크거나 업로드가 어려울 경우, commicat.sup@gmail.com으로 문의해주세요.</p>
        <p className={styles.comment}>&emsp;b. 원본 이미지 파일이 그대로 공개되길 원하지 않는다면, 샘플 레이어를 다운로드해서 원본 위에 마스킹 후 샘플 등록을 하실 수 있습니다.</p>
        <p className={styles.comment}>&emsp;c. 작업 상세페이지에 게시될 샘플 파일들입니다. 작업 파일과 같아도 괜찮습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 이미지의 경우, .png, .jpeg, .jpg, .webp, .gif만 업로드할 수 있습니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 오디오의 경우, .mp3만 업로드할 수 있습니다. 다른 확장자의 경우 브라우저에 따라 재생이 되지 않는 문제가 발생합니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 비디오의 경우, .mp4만 업로드할 수 있습니다. 다른 확장자의 경우 브라우저에 따라 재생이 되지 않는 문제가 발생합니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 텍스트의 경우, 원본 파일의 전체 혹은 일부를 텍스트 샘플에 붙여넣어 주세요. 앞 부분은 썸네일에도 표기됩니다.</p>
        <p className={styles.comment}>&emsp;&emsp;* 기타의 경우, 샘플의 형식을 지정한 후, 그에 맞게 샘플을 올려주세요.</p>
        <p className={styles.comment}>&emsp;d. 이미지 유형은 썸네일이 필요합니다. 다른 유형은 첫 번째 샘플이 썸네일로 등록됩니다.</p>
        <p className={styles.comment}>&emsp;e. 작업의 상세 페이지 하단에 게시되는 코멘트</p>
        <p className={styles.comment}>&emsp;f. 검색에 이용되는 해시태그</p>
        <br />
        <p>9. 작업 완료 후, 대금을 지급받습니다.</p>
        <p className={styles.comment}>&emsp;* 대금 지급은 24시간 내로 자동으로 이루어집니다.</p>
        <p className={styles.comment}>&emsp;* 설정의 계좌 정보를 다시 확인해주세요.</p>
        <div className={styles.image} style={{ paddingBottom: '71.8%' }}>
          <Image fill sizes="100%" priority src="/guide9.png" alt="Guide 9" />
        </div>
        <p className={styles.comment}>&emsp;* 완료 상태 작업 페이지에서 클라이언트/크리에이터는 파일을 다운로드할 수 있습니다.</p>
        <p className={styles.comment}>&emsp;* 비공개 요청이 아니라면 상세 페이지의 링크를 확인할 수 있습니다.</p>
        <br />
        <p>10. 상세 페이지가 게시됩니다.</p>
        <div className={styles.image} style={{ paddingBottom: '45.6%' }}>
          <Image fill sizes="100%" priority src="/guide10.png" alt="Guide 10" />
        </div>
        <br />
        <p>클라이언트에게 어떤 작업을 요청 받는지 다음과 같이 알릴 수 있습니다.</p>
        <p className={styles.comment}>&emsp;* 프로필 설정의 소개란</p>
        <p className={styles.comment}>&emsp;* 포트폴리오</p>
        <p className={styles.comment}>&emsp;* 별다른 설명을 적지 않고, 그동안의 결과물들로만 어떤 작업을 하는지 짐작하게 하셔도 됩니다.</p>
        <br />
        <p>11. 포트폴리오(선택사항) 페이지입니다.</p>
        <div className={styles.image} style={{ paddingBottom: '50%' }}>
          <Image fill sizes="100%" priority src="/guide11.png" alt="Guide 11" />
        </div>
        <p className={styles.comment}>&emsp;a. 이미지를 업로드(최대 10장)</p>
        <p className={styles.comment}>&emsp;b. 유튜브 링크로 동영상을 업로드</p>
        <p className={styles.comment}>&emsp;* 본인의 프로필 페이지에 게시됩니다.</p>
        <p className={styles.comment}>&emsp;* notion, X 등 다른 소개 페이지 링크를 올리셔도 됩니다.</p>
        <p className={styles.comment}>&emsp;* 포트폴리오 작성은 선택사항입니다.</p>
        <p className={styles.comment}>&emsp;* &apos;유효하지 않은 이미지가 포함되어있습니다&apos;라는 오류가 뜰 경우 브라우저 캐시 문제로, 다른 브라우저나 시크릿 탭에서 저장 후 이용해주세요.</p>
      </div>
    </NoticeMainContainer>
  )
}

export default NoticeB
