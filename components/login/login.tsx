import { yupResolver } from '@hookform/resolvers/yup'
import { montserrat } from '@lib/fonts'
import { TextField } from '@mui/material'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


import styles from './_login.module.scss'



type Props = {
    // TODO - pass styles as a prop
    style?: CSSProperties
    onSignInSuccess?: () => void
    onSignInFailed?: () => void
}




type LoginFormInputs = {
    email: string
    password: string
}

const LoginFormInputValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

const SignInForm = ({
    style,
    onSignInSuccess,
    onSignInFailed
}: Props) => {

    const supabaseClient = useSupabaseClient()
    const user = useUser()

    const { register, handleSubmit } = useForm<LoginFormInputs>({
        resolver: yupResolver(LoginFormInputValidation),
        defaultValues: {
            email: '',
            password: ''
        }
    })


    function onSignInBtnClick() {
        handleSubmit(onLoginFormValid, onLoginFormInvalid)()
    }


    async function onLoginFormValid(data: LoginFormInputs) {
        console.log('running')
        const loginAttemptRes = await supabaseClient.auth.signInWithPassword({
            email: data.email,
            password: data.password
        })

        console.log(loginAttemptRes)

        if(!loginAttemptRes.error) {
            if(onSignInSuccess) {
                onSignInSuccess()
            }
        }
        else {
            if(onSignInFailed) {
                onSignInFailed()
            }
        }
    }


    async function onLoginFormInvalid(errors: Object) {
        // TODO
    }






    return (
        <>
            <div className={styles['signin-form-wrapper']} style={style}>
                <input
                    id={styles['username-input']}
                    className={`${montserrat.className}`}
                    type="text"
                    {...register('email')}
                    placeholder='Email'
                />

                <input
                    id={styles['password-input']}
                    className={`${montserrat.className}`}
                    type="password"
                    {...register('password')}
                    placeholder='Password'
                />
                
                <button
                    onClick={e => onSignInBtnClick()}
                    className={`${montserrat.className} ${styles['sign-in-btn']}`}
                >
                    Sign In
                </button>
            </div>
        </>
    )
}

export default SignInForm