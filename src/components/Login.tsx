import styles from './Login.module.css'

export default function Login() {
    return (
        <div className={styles.formContainer}>
            <h1>Log In</h1>
            <form action="">
                <label htmlFor="Username">Username</label>
                <input type="text" />
                <label htmlFor="">Password</label>
                <input type="password" />
                <input type="submit" value='Login' />
            </form>
        </div>
    );
}