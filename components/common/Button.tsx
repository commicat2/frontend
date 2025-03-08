import styles from './Button.module.css'

const Button = ({ className = '', children, ...props }: ClassName & ButtonProps & Children) => {
  return <button className={`${styles.button} ${className}`} type="button" {...props}>{children}</button>
}

export default Button
