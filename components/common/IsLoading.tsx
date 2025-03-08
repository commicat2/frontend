import { PulseLoader } from 'react-spinners'
import styles from './IsLoading.module.css'

const IsLoading = () => {
  return (
    <div className={styles.container}>
      <PulseLoader color="#2FCF27" size="1rem" />
    </div>
  )
}

export default IsLoading
