import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const OtherCategoryButtons = ({ category, handleCategoryClick }: { category: CategoryKey, handleCategoryClick: (category: CategoryKey) => void }) => {
  return (
    <MainContainerSubHeader>
      <MainContainerSubButton
        selected={!category}
        disabled={!category}
        onClick={() => { return handleCategoryClick('') }}
      >
        전체
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '2'}
        disabled={category === '2'}
        onClick={() => { return handleCategoryClick('2') }}
      >
        프로그래밍
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '3'}
        disabled={category === '3'}
        onClick={() => { return handleCategoryClick('3') }}
      >
        코드 리뷰
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === 'Z'}
        disabled={category === 'Z'}
        onClick={() => { return handleCategoryClick('Z') }}
      >
        기타
      </MainContainerSubButton>
    </MainContainerSubHeader>
  )
}

export default OtherCategoryButtons
