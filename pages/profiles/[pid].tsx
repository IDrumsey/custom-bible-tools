import { supabase } from '@lib/supabaseClient'
import { User } from '@supabase/supabase-js'
// import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {

}

const Profile = ({

}: Props) => {

    const router = useRouter()
    const { pid: userId } = router.query

    const [user, userSetter] = useState<User>()


    useEffect(() => {

        const handleUserIdSet = async () => {
            if(userId == 'me') {
                // show currently logged in user
                    const { data, error } = await supabase.auth.getSession()
                    if(data && data.session && data.session.user) {
                        userSetter(data.session.user)
                    }
            }

            else {
                const { data, error } = await supabase.from('profiles').select().eq('id', userId)
                
                if(data && data.length == 1) {
                    userSetter(data[0])
                }
            }
        }

        if(userId) {
            handleUserIdSet()
        }
    }, [userId])



    async function getUser(userId: string) {

    }
    
    return (
        <>
            <h4>{user?.user_metadata.first_name} {user?.user_metadata.last_name}</h4>
        </>
    )
}

export default Profile