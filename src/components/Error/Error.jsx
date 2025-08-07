import styles from './Error.module.css'

export default function Error({ message }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>!</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
    </div>
  )
}