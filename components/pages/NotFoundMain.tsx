import Image from 'next/image'
import ButtonLink from 'components/common/ButtonLink'
import styles from './NotFoundMain.module.css'

const NotFoundMain = () => {
  return (
    <main className={styles.container}>
      <div className={styles.image}>
        <Image fill sizes="100%" priority src="/not-found.png" alt="Not Found" />
      </div>
      <div className={styles.content}>
        <p>찾을 수 없는 페이지입니다.</p>
        <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.</p>
      </div>
      <ButtonLink href="/">홈으로 이동</ButtonLink>
    </main>
  )
}

export default NotFoundMain
