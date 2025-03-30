import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const VideoCategoryButtons = ({ category, handleCategoryClick }: { category: CategoryKey, handleCategoryClick: (category: CategoryKey) => void }) => {
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
        selected={category === '1'}
        disabled={category === '1'}
        onClick={() => { return handleCategoryClick('1') }}
      >
        영상편집
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '2'}
        disabled={category === '2'}
        onClick={() => { return handleCategoryClick('2') }}
      >
        모션그래픽
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '3'}
        disabled={category === '3'}
        onClick={() => { return handleCategoryClick('3') }}
      >
        애니메이션
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

export default VideoCategoryButtons
