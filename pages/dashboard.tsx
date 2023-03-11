import { Skeleton } from '@mui/material'
import styles from '@Styles/_dashboard.module.scss'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


type Props = {

}

const loadingDelayMilliseconds = 2000

const NewComponent = ({

}: Props) => {


    const supabaseClient = useSupabaseClient()

    const user = useUser()

    const router = useRouter()


    const [loadingDelayOver, loadingDelayOverSetter] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            loadingDelayOverSetter(true)
        }, loadingDelayMilliseconds)
    }, [])


    async function onSignOutBtnClick() {
        const signOutRes = await supabaseClient.auth.signOut()

        if(!signOutRes.error) {
            onSignOutSuccess()
        }
    }

    function onSignOutSuccess() {
        router.push('/auth')
    }

    return (
        <div id={styles['dashboard-wrapper']}>
        
        {
            user && loadingDelayOver ?

            <>
                <h1 id={styles['welcome-msg']}>Welcome {user.email}</h1>

                <button id={styles['sign-out-btn']} onClick={e => onSignOutBtnClick()}>Sign out</button>
            </>
            :

            <Skeleton variant='text' height={100} width='100%' sx={{
                margin: 'auto',
                marginTop: '15px'
            }}/>
        }

        </div>
    )
}

export default NewComponent