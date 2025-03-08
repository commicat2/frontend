import ImageSample from './ImageSample'
import AudioSample from './AudioSample'
import VideoSample from './VideoSample'
import TextSample from './TextSample'
import WorkContent from './WorkContent'
import styles from './index.module.css'

const WorkMain = ({ creator, client, details }: { creator: WorkCreator, client: WorkClient, details: WorkDetails }) => {
  const renderSample = () => {
    if (details.genre === 2) return <AudioSample details={details} />
    if (details.genre === 3) return <VideoSample details={details} />
    if (details.genre === 4) return <TextSample details={details} />
    return <ImageSample details={details} />
  }

  return (
    <main className={styles.container}>
      <div className={styles.sample}>{renderSample()}</div>
      <div className={styles.content}><WorkContent creator={creator} client={client} content={details.content} /></div>
    </main>
  )
}

export default WorkMain
