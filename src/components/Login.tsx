import styles from './login.module.css'

export default function Login() {
    return (
        <div className={styles.loginContainer}>
            <form action="">
                <label htmlFor="Username">Username</label>
                <input type="text" />
                <label htmlFor="">Password</label>
                <input type="password" />
                <input type="submit" value='Log in' />
            </form>
        </div>
    );
}