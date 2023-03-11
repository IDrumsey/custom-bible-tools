import { useUser } from '@supabase/auth-helpers-react'
import { CSSProperties, useEffect, useState } from 'react'
import styles from './_authenticated-circle-indicator.module.scss'

type Props = {
    style?: CSSProperties
    size?: string,
    loggedOutColor?: string,
    loggedInColor?: string,
}

const AuthenticatedCircleIndicator = ({
    style,
    size = '10px',
    loggedInColor = '#32a889',
    loggedOutColor = '#ab3270'
}: Props) => {

    const user = useUser()

    const [loggedIn, loggedInSetter] = useState(false)
    

    useEffect(() => {
        loggedInSetter(!!user)
    }, [user])

    return (
        <div 
            className={styles['auth-circle-indicator']}
            style={{
                ...style,
                backgroundColor: loggedIn ? loggedInColor : loggedOutColor,
                width: size,
                height: size
            }}
        ></div>
    )
}

export default AuthenticatedCircleIndicator