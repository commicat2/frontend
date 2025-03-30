import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const AudioCategoryButtons = ({ category, handleCategoryClick }: { category: CategoryKey, handleCategoryClick: (category: CategoryKey) => void }) => {
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
        음악
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '2'}
        disabled={category === '2'}
        onClick={() => { return handleCategoryClick('2') }}
      >
        음향
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '3'}
        disabled={category === '3'}
        onClick={() => { return handleCategoryClick('3') }}
      >
        믹싱
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '4'}
        disabled={category === '4'}
        onClick={() => { return handleCategoryClick('4') }}
      >
        보이스
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '5'}
        disabled={category === '5'}
        onClick={() => { return handleCategoryClick('5') }}
      >
        더빙
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

export default AudioCategoryButtons
