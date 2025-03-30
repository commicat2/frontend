import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const TextCategoryButtons = ({ category, handleCategoryClick }: { category: CategoryKey, handleCategoryClick: (category: CategoryKey) => void }) => {
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
        소설
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '2'}
        disabled={category === '2'}
        onClick={() => { return handleCategoryClick('2') }}
      >
        시나리오
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '3'}
        disabled={category === '3'}
        onClick={() => { return handleCategoryClick('3') }}
      >
        작사
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '4'}
        disabled={category === '4'}
        onClick={() => { return handleCategoryClick('4') }}
      >
        번역
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '5'}
        disabled={category === '5'}
        onClick={() => { return handleCategoryClick('5') }}
      >
        피드백
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

export default TextCategoryButtons
