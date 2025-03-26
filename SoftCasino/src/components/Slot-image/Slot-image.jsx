import styles from "./Slot-image-styles.module.css"

export default function SlotImage({imgSrc, reference}){
    return <img ref={reference} src={imgSrc} className={styles.imgSymbol} />
}