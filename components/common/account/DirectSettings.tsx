import ButtonLink from 'components/common/ButtonLink'
import styles from './DirectSettings.module.css'

const DirectSettings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Commicat을 이용해주셔서 감사드립니다!</p>
        <p>아래 링크를 통해 프로필을 설정 하실 수 있습니다.</p>
      </div>
      <ButtonLink href="/settings">프로필 설정하러 가기</ButtonLink>
    </div>
  )
}

export default DirectSettings
