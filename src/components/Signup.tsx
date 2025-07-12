import styles from './Signup.module.css'

export default function SignUp() {
    return (
        <div className={styles.formContainer}>
            <h1>Sign Up</h1>
            <form action="">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
                <label htmlFor="confirmPw">Confirm Password</label>
                <input type="password" id="confirmPw"/>
                <input type="submit" value='Sign Up' />
            </form>
        </div>
    );
}