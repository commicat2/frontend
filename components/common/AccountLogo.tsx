import Image from 'next/image'
import Link from 'next/link'
import styles from './AccountLogo.module.css'

const AccountLogo = () => {
  return (
    <Link className={styles.logo} href="/" prefetch={false}>
      <Image fill sizes="100%" priority src="/logo.png" alt="Commicat Logo" />
    </Link>
  )
}

export default AccountLogo
