import MainContainerSubHeader from 'components/common/MainContainerSubHeader'
import MainContainerSubButton from 'components/common/MainContainerSubButton'

const HashTagsButtons = ({ hashTag, hashTags, handleHashTagClick }: { hashTag: string, hashTags: string[], handleHashTagClick: (hashTag: string) => void }) => {
  if (!hashTags.length) return <div />
  return (
    <MainContainerSubHeader>
      {hashTags.map((tag, index) => {
        return (
          <MainContainerSubButton
            key={tag + String(index)}
            selected={tag === hashTag}
            onClick={() => {
              if (tag === hashTag) return handleHashTagClick('')
              return handleHashTagClick(tag)
            }}
          >
            {`#${tag}`}
          </MainContainerSubButton>
        )
      })}
    </MainContainerSubHeader>
  )
}

export default HashTagsButtons
