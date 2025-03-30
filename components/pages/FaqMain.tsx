import MainContainer from 'components/common/MainContainer'
import FaqCard from 'components/common/FaqCard'
import styles from './FaqMain.module.css'

const FaqMain = () => {
  return (
    <main className={styles.container}>
      <MainContainer>
        <div className={styles.content}>
          <p className={styles.headerText}>자주 묻는 질문</p>
          <hr className={styles.hr} />
          <FaqCard>
            <p>Q. 이메일을 잊어버렸습니다.</p>
            <hr />
            <p>A. 계정과 관련된 정보를 포함하여 commicat.sup@gmail.com으로 문의해주세요.</p>
            <p>&nbsp;&nbsp;계정과 관련된 정보가 없다면 이메일을 찾지 못할 수 있으므로 분실하지 않도록 조심해주세요.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 결제 환불이 가능한가요?</p>
            <hr />
            <p>A. 입금이 완료된 후 요청이 작업중 상태가 됐다면, 크리에이터가 작업에 착수중인 것으로 간주하여 환불이 어렵습니다.</p>
            <p>&nbsp;&nbsp;전달된 작업 결과물이 주관적으로 마음에 들지 않더라도 환불이 어렵습니다.</p>
            <p>&nbsp;&nbsp;아래와 같은 경우 환불이 진행됩니다.</p>
            <p>&nbsp;&nbsp;&nbsp;- 작업 완료 기한까지 크리에이터가 작업을 완료하지 못한 경우</p>
            <p>&nbsp;&nbsp;&nbsp;- 결과물이 열리지 않거나 빈 파일이거나 요청 내용과 너무나 상이한 경우</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 현금영수증을 신청하고 싶습니다.</p>
            <hr />
            <p>A. 작업을 요청하기 전, commicat.sup@gmail.com으로 문의해주시면 현금영수증 발급 절차를 안내해드립니다.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 커미션과 외주의 차이점은 뭔가요?</p>
            <hr />
            <p>A. 커미션은 저작 재산권이 크리에이터에게 있고, 외주는 저작 재산권이 클라이언트에게 있습니다.</p>
            <p>&nbsp;&nbsp;저작 재산권이란 작업 결과물을 영리적인 목적으로 사용할 수 있는 권리입니다.</p>
            <p>&nbsp;&nbsp;커미션의 경우에도 크리에이터가 허용한 범위 내에서 영리적인 목적으로 사용할 수 있습니다.</p>
            <p>&nbsp;&nbsp;저작권은 커미션, 외주 모두 크리에이터에게 귀속됩니다.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 크리에이터 세무 절차는 어떻게 되나요?</p>
            <hr />
            <p>A. 크리에이터 유형에 따라 세무 절차는 다르게 적용되기 때문에, 문의사항이 있다면 commicat.sup@gmail.com으로 문의해주세요.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 크리에이터가 실제로 받게 되는 대금은 얼마인가요?</p>
            <hr />
            <p>A. 요청 금액에서 요청 금액에 중개 수수료(%)를 곱한 만큼을 뺀 금액을 대금으로 지급받습니다.</p>
            <p>&nbsp;&nbsp;ex) 요청 금액: 10만원, 수수료: 5%일 경우 대금: 9만 5천원</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 수수료 정책이 바뀔 수 있나요?</p>
            <hr />
            <p>A. 수수료 정책은 바뀌지 않을 예정입니다.</p>
            <p>&nbsp;&nbsp;부득이하게 수수료 정책이 바뀔 경우, 6개월 전에 미리 고지해야함을 정책으로 합니다.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 선정적으로 보일 수 있는 컨텐츠도 요청받을 수 있나요?</p>
            <hr />
            <p>A. 비공개 유형이 아닌 요청의 경우 선정적인 작업 요청을 받으실 수 없습니다.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 실물을 배송해야하는 작업도 요청받을 수 있나요?</p>
            <hr />
            <p>A. 네. 실물 배송이 필요한 경우 클라이언트의 주소를 받을 목적으로 dm을 활용할 수 있습니다.</p>
            <p>&nbsp;&nbsp;배송 과정에서 생긴 문제는 회사가 관여하지 않습니다.</p>
            <p>&nbsp;&nbsp;작업 파일, 샘플 파일 그리고 썸네일은 작업 결과물을 증명할 수 있는 이미지 파일 등으로 등록해주세요.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 카테고리를 추가하고 싶습니다.</p>
            <hr />
            <p>A. 원하는 카테고리가 없는 경우 기타 카테고리를 활용해주세요. 적합하다고 판단되는 카테고리는 추후 추가될 수 있습니다.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 포트폴리오 작성 중에 유효하지 않은 이미지가 포함되어있습니다 라는 오류가 발생합니다.</p>
            <hr />
            <p>A. 브라우저의 캐시 문제로, 다른 브라우저나 시크릿 탭에서 포트폴리오 저장 후 이용해주세요.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. 크리에이터 등록 또는 작업 완료 후에도 홈페이지에 보이지 않습니다.</p>
            <hr />
            <p>A. 홈페이지의 경우 20초 간격으로 캐싱된 데이터를 사용하기 때문에 곧바로 게시되지 않습니다. 조금만 기다려주세요.</p>
          </FaqCard>
          <br />
          <FaqCard>
            <p>Q. FAQ에 원하는 질문이 없습니다.</p>
            <hr />
            <p>A. 서비스 이용에 문제가 생겼거나, 문의사항이 있다면 commicat.sup@gmail.com으로 문의해주세요.</p>
          </FaqCard>
        </div>
      </MainContainer>
    </main>
  )
}

export default FaqMain
