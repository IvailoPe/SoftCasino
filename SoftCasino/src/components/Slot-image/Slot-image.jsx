import styles from "./Slot-image-styles.module.css"

export default function SlotImage({imgSrc, reference, styleObj}){
    return <img ref={reference} src={imgSrc} className={styles.imgSymbol}  style={{...styleObj}} />
}