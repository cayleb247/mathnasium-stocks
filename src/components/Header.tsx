import styles from './header.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoContainer}>
                <h3>Mathnasium</h3>
                <h3>|</h3>
                <h3>Stocks</h3>
            </div>
        </div>
    );
}