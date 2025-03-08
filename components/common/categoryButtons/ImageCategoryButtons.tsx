import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const ImageCategoryButtons = ({ category, handleCategoryClick }: { category: CategoryKey, handleCategoryClick: (category: CategoryKey) => void }) => {
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
        일러스트
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '2'}
        disabled={category === '2'}
        onClick={() => { return handleCategoryClick('2') }}
      >
        2D 버츄얼
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '3'}
        disabled={category === '3'}
        onClick={() => { return handleCategoryClick('3') }}
      >
        3D 버츄얼
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '4'}
        disabled={category === '4'}
        onClick={() => { return handleCategoryClick('4') }}
      >
        리깅
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '5'}
        disabled={category === '5'}
        onClick={() => { return handleCategoryClick('5') }}
      >
        디자인
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '6'}
        disabled={category === '6'}
        onClick={() => { return handleCategoryClick('6') }}
      >
        원화
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '7'}
        disabled={category === '7'}
        onClick={() => { return handleCategoryClick('7') }}
      >
        CG
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '8'}
        disabled={category === '8'}
        onClick={() => { return handleCategoryClick('8') }}
      >
        GIF
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === '9'}
        disabled={category === '9'}
        onClick={() => { return handleCategoryClick('9') }}
      >
        피드백
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === 'A'}
        disabled={category === 'A'}
        onClick={() => { return handleCategoryClick('A') }}
      >
        만화
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === 'B'}
        disabled={category === 'B'}
        onClick={() => { return handleCategoryClick('B') }}
      >
        리터칭
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === 'C'}
        disabled={category === 'C'}
        onClick={() => { return handleCategoryClick('C') }}
      >
        사진
      </MainContainerSubButton>
      <MainContainerSubButton
        selected={category === 'Z'}
        disabled={category === 'Z'}
        onClick={() => { return handleCategoryClick('Z') }}
      >
        기타(이미지)
      </MainContainerSubButton>
    </MainContainerSubHeader>
  )
}

export default ImageCategoryButtons
