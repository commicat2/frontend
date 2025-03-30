import styles from './PrivacyMain.module.css'

const PrivacyMain = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>커미캣 개인정보 처리방침</h1>
        <br />
        <p>주식회사 커미캣(이하 &apos;회사&apos;라 함)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
        <br />
        <h2>제1조(개인정보의 처리 목적)</h2>
        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        <ul>
          <li>① 회사는 아웃소싱 중개 플랫폼 서비스 제공을 위해 회원 계정의 생성 및 관리, 서비스 제공, 서비스 이용 및 정산 등과 관련한 목적으로 개인정보를 처리합니다.</li>
          <li>② 회원 식별 및 본인확인, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.</li>
          <li>③ 이메일과 비밀번호는 회원 로그인 및 회원 식별을 위한 기본적인 수단으로 활용됩니다.</li>
          <li>④ 예금주명과 계좌번호는 클라이언트의 입금 확인 및 환불 처리, 그리고 크리에이터에 대한 대금 지급을 위한 목적으로만 제한적으로 이용됩니다.</li>
          <li>⑤ 크리에이터의 경우, NICE 개인실명인증을 통한 본인확인 절차를 진행하며, 이는 서비스의 신뢰성 확보 및 안전한 거래환경 조성을 위함입니다.</li>
        </ul>
        <br />
        <h2>제2조(처리하는 개인정보의 항목)</h2>
        <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
        <ul>
          <li>
            ① 회원 가입 시 필수 수집 항목
            <ul>
              <li>이메일</li>
              <li>비밀번호</li>
            </ul>
          </li>
          <li>
            ② 회원 가입 시 선택 수집 항목
            <ul>
              <li>예금주명</li>
              <li>계좌번호</li>
            </ul>
          </li>
          <li>
            ③ 크리에이터의 경우 추가 수집 항목
            <ul>
              <li>NICE 개인실명인증을 통한 본인확인 정보</li>
            </ul>
          </li>
          <li>④ 회사는 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보 등의 정보가 자동으로 생성되어 수집될 수 있으나, 현재는 이러한 정보를 별도로 수집하지 않고 있습니다.</li>
        </ul>
        <br />
        <h2>제3조(개인정보의 처리 및 보유 기간)</h2>
        <ul>
          <li>
            ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </li>
          <li>
            ② 회원의 개인정보는 회원이 회사의 서비스를 이용하는 동안에만 보유하며, 회원탈퇴 시에는 회원의 개인정보는 별도의 보관 없이 즉시 파기됩니다.
          </li>
          <li>
            ③ 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보관합니다.
            <ul>
              <li>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우 해당 수사·조사 종료 시까지</li>
              <li>서비스 이용에 따른 채권·채무관계가 잔존하는 경우 해당 채권·채무관계 정산 시까지</li>
            </ul>
          </li>
          <li>
            ④ 관련 법령에 의한 정보 보유 기간은 다음과 같습니다.
            <ul>
              <li>
                전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보존 의무
                <ul>
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </li>
              <li>
                전자금융거래법에 따른 보존 의무
                <ul>
                  <li>전자금융거래에 관한 기록: 5년</li>
                </ul>
              </li>
              <li>
                통신비밀보호법에 따른 보존 의무
                <ul>
                  <li>로그인 기록: 3개월</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <br />
        <h2>제4조(개인정보의 제3자 제공)</h2>
        <p>① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
        <p>② 현재 회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 향후 제3자 제공이 필요한 경우에는 사전에 이용자에게 제공받는 자, 제공 목적, 제공 항목, 보유 및 이용기간 등에 대해 고지하고 별도의 동의를 받을 예정입니다.</p>
        <p>③ 회사는 크리에이터와 클라이언트 간 개인정보를 공유하지 않습니다. 양측 간의 커뮤니케이션은 회사의 플랫폼 내에서 이루어지며, 필요한 경우 회사의 중개를 통해 진행됩니다.</p>
        <br />
        <h2>제5조(개인정보처리 위탁)</h2>
        <p>① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
        {/* 위탁 처리업체 및 내용은 상황에 따라 추가할 수 있습니다 */}
        <p>② 회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
        <p>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
        <p>④ 회사는 NICE평가정보(주)를 제외한 다른 위탁 업체(결제, 호스팅, 메일 발송 등)나 국외 이전 정보가 없습니다.</p>
        <br />
        <h2>제6조(개인정보의 파기)</h2>
        <p>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
        <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
        <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
        <ul>
          <li>파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
          <li>파기방법: 회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
        </ul>
        <br />
        <h2>제7조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h2>
        <p>① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
        <p>② 제1항에 따른 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
        <p>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 &quot;개인정보 처리 방법에 관한 고시(제2020-7호)&quot; 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
        <p>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.</p>
        <p>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p>
        <p>⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
        <p>⑦ 정보주체는 대표 이메일(commicat.sup@gmail.com)을 통해 문의한 후 개인정보 열람, 정정, 삭제, 처리정지 요구를 할 수 있으며, 회사는 이에 대해 지체 없이 필요한 조치를 취하겠습니다.</p>
        <p>⑧ 회원 탈퇴를 원하는 경우, 회원은 웹사이트의 &apos;계정 설정&apos; 페이지에서 &apos;계정 비활성화&apos; 버튼을 클릭한 후 회원탈퇴 절차를 진행할 수 있습니다. 탈퇴 시 회원의 모든 개인정보는 즉시 파기됩니다.</p>
        <br />
        <h2>제8조(정보주체의 의무)</h2>
        <p>① 정보주체는 자신의 개인정보를 보호할 의무가 있으며, 회사의 귀책사유가 없이 ID, 비밀번호, 접근매체 등의 양도·대여·분실이나 로그인 상태에서 자리를 비우는 등 본인의 부주의나 관계법령에 의한 판단으로 인해 발생하는 과실에 대해서는 회사가 책임을 지지 않습니다.</p>
        <p>② 정보주체는 개인정보를 최신의 상태로 유지해야 하며, 부정확한 정보 입력으로 인해 발생하는 문제의 책임은 정보주체 본인에게 있습니다.</p>
        <p>③ 타인의 개인정보를 도용하여 회원가입 등을 하는 경우, 이용자 자격을 상실하거나 관련 법령에 의해 처벌받을 수 있습니다.</p>
        <p>④ 정보주체는 아이디, 비밀번호 등에 대한 보안을 유지할 책임이 있으며, 제3자에게 이를 양도하거나 대여할 수 없습니다.</p>
        <p>⑤ 정보주체는 회사의 개인정보보호정책에 변경이 있을 경우, 회사가 공지사항을 통하여 고지하는 변경 사항에 대해 확인할 의무가 있습니다.</p>
        <br />
        <h2>제9조(개인정보의 안전성 확보 조치)</h2>
        <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
        <ul>
          <li>
            ① 관리적 조치
            <ul>
              <li>개인정보 보호책임자의 지정 및 운영</li>
              <li>개인정보 취급자의 최소화 및 교육 실시</li>
              <li>내부관리계획의 수립 및 시행</li>
            </ul>
          </li>
          <li>
            ② 기술적 조치
            <ul>
              <li>개인정보처리시스템 등의 접근권한 관리</li>
              <li>개인정보의 암호화</li>
              <li>보안프로그램의 설치 및 운영</li>
              <li>개인정보가 저장·전송 시 암호화 조치</li>
            </ul>
          </li>
          <li>
            ③ 물리적 조치
            <ul>
              <li>개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대한 출입통제 절차를 수립·운영</li>
            </ul>
          </li>
        </ul>
        <p>④ 회사는 개인정보의 안전한 처리를 위하여 내부관리계획을 수립·시행하고 있습니다. 회사는 사업 규모 등을 고려하여 개인정보 보호책임자를 중심으로 전사적인 개인정보 보호 활동을 진행하고 있습니다.</p>
        <br />
        <h2>제10조(개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
        <p>① 회사는 현재 이용자의 정보를 자동으로 수집하는 쿠키(Cookie)를 사용하지 않습니다.</p>
        <p>② 향후 쿠키를 사용하게 될 경우, 쿠키의 사용 목적, 설정 및 거부 방법에 대한 내용을 본 개인정보 처리방침을 통해 안내할 예정입니다.</p>
        <br />
        <h2>제11조(개인정보 보호책임자)</h2>
        <p>① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
        <p>▶ 개인정보 보호책임자</p>
        <p>
          성명: 박지석
          <br />
          직위: 대표이사
          <br />
          연락처: commicat.sup@gmail.com
        </p>
        <p>② 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
        <br />
        <h2>제12조(개인정보의 추가적인 이용·제공 판단기준)</h2>
        <p>회사는 ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.</p>
        <p>① 이에 따라 회사는 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.</p>
        <ul>
          <li>개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>
          <li>개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부</li>
          <li>개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
          <li>가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
        </ul>
        <p>② 회사는 이용자의 개인정보를 당초 수집 목적 범위 내에서만 이용하며, 추가적인 이용·제공이 필요한 경우에는 반드시 정보주체의 동의를 받아 처리할 예정입니다.</p>
        <br />
        <h2>제13조(개인정보의 국외 이전)</h2>
        <p>회사는 이용자의 개인정보를 국외로 이전하지 않습니다. 향후 국외 이전이 필요한 경우에는 이용자에게 사전 고지 및 동의를 받아 처리할 예정이며, 관련 법령에 따라 보호조치를 취하고 이용자의 권리를 보장하겠습니다.</p>
        <br />
        <h2>제14조(권익침해 구제방법)</h2>
        <p>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p>
        <ul>
          <li>① 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
          <li>② 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
          <li>③ 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
          <li>④ 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
        </ul>
        <p>「개인정보보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 따른 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
        <p>※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</p>
        <br />
        <h2>제15조(결제 관련 정보 처리)</h2>
        <p>결제 관련 정보는 안전한 절차에 따라 처리되며, 입금 확인 및 대금 지급 등의 목적으로만 사용됩니다. 모든 거래 내역은 관련 법령에 따라 적절히 보관되며, 필요 시 열람이 가능합니다.</p>
        <br />
        <h2>제16조(영상정보처리기기 운영·관리에 관한 사항)</h2>
        <p>회사는 현재 아웃소싱 중개 플랫폼 서비스를 온라인으로만 제공하고 있으며, 별도의 영상정보처리기기를 운영하고 있지 않습니다. 향후 영상정보처리기기를 설치·운영하게 될 경우, 관련 법령에 따라 별도의 방침을 수립하여 공개하도록 하겠습니다.</p>
        <br />
        <h2>제17조(개인정보 처리방침 변경)</h2>
        <p>① 이 개인정보처리방침은 2025년 4월 1일부터 적용됩니다.</p>
        <p>② 회사는 개인정보처리방침을 변경하는 경우에는 변경 및 시행의 시기, 변경된 내용을 공지사항 및 전자우편을 통해 고지할 것입니다.</p>
        <p>③ 현재 이 개인정보처리방침이 최초로 제정된 것으로, 이전의 개정 이력은 없습니다.</p>
        <br />
        <h2>제18조(기타 사항)</h2>
        <p>① 회사는 개인정보 보호를 매우 중요시하며, 정보주체의 개인정보가 안전하게 처리될 수 있도록 최선의 노력을 다하고 있습니다.</p>
        <p>② 본 개인정보 처리방침에서 규정하지 않은 사항은 관계법령 및 회사의 서비스 이용약관에 따릅니다.</p>
        <p>③ 본 개인정보 처리방침과 관련하여 보다 자세한 내용이 궁금하신 경우, 회사의 개인정보 보호책임자에게 문의하여 주시기 바랍니다.</p>
        <br />
        <p>본 약관은 2025년 4월 1일부터 시행합니다.</p>
        <p>커미캣 대표이사 박지석</p>
      </div>
    </main>
  )
}

export default PrivacyMain
