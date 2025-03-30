import Image from 'next/image'
import Link from 'next/link'
import styles from './NavLogo.module.css'

const NavLogo = () => {
  return (
    <Link href="/" prefetch={false}>
      <div className={styles.logo}>
        <Image fill sizes="100%" priority src="/logo.png" alt="Commicat Logo" />
      </div>
    </Link>
  )
}

export default NavLogo
