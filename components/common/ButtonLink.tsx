import Link, { LinkProps } from 'next/link'
import styles from './ButtonLink.module.css'

const ButtonLink = ({ className = '', children, ...props }: ClassName & Children & LinkProps) => {
  return <Link className={`${styles.button} ${className}`} {...props}>{children}</Link>
}

export default ButtonLink
