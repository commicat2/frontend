import Image from 'next/image'
import styles from './EyeToggler.module.css'

const EyeToggler = ({ ...props }: ButtonProps) => {
  return (
    <button className={styles.eyeToggler} type="button" tabIndex={-1} {...props}>
      <Image fill sizes="100%" src="/eye.png" alt="Eye Toggler" />
    </button>
  )
}

export default EyeToggler
