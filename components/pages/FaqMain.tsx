import MainContainer from 'components/common/MainContainer'
import FaqCard from 'components/common/FaqCard'
import styles from './FaqMain.module.css'

const FaqMain = () => {
  return (
    <MainContainer>
      <div className={styles.content}>
        <p className={styles.headerText}>자주 묻는 질문</p>
        <hr />
        <FaqCard>Q.</FaqCard>
        <br />
        <FaqCard>Q.</FaqCard>
        <br />
        <FaqCard>Q.</FaqCard>
        <br />
        <FaqCard>Q.</FaqCard>
        <br />
        <FaqCard>Q.</FaqCard>
      </div>
    </MainContainer>
  )
}

export default FaqMain
