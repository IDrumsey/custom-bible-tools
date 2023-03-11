import SignInForm from "@Components/login/login"

import styles from '@Styles/_auth.module.scss'
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface Props {

}

type LoginError = {
    msg: string
}

const AuthPage = ({

}: Props) => {

    const router = useRouter()

    const user = useUser()


    const [loginError, loginErrorSetter] = useState<LoginError>()



    useEffect(() => {
        if(isLoggedIn()) {
            onSignInSuccess()
        }
    }, [user])


    function isLoggedIn(): boolean {
        return !!user
    }


    function onSignInSuccess() {
        router.push('/dashboard')
    }

    function onSignInFail() {
        console.log('failed')
        loginErrorSetter({
            msg: 'Authentication Failed'
        })
    }




    return (
        <>
            <h1 id={styles['home-title']}>Custom Bible Tools</h1>
            <SignInForm
                style={{
                margin: 'auto',
                }}
                onSignInSuccess={onSignInSuccess}
                onSignInFailed={onSignInFail}
            />
            {
                loginError &&

                <div className={styles['login-error-msg-wrapper']}>
                    <p>Login failed</p>
                </div>
            }
        </>
    )
}

export default AuthPage