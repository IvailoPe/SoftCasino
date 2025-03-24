import styles from "./Form-error-message-styles.module.css"

export default function FormErrorMessage({text}){
    return <p className={styles.error}>{text}</p>
}