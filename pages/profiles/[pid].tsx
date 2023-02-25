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

    const [user, userSetter] = useState<any>()


    useEffect(() => {

        const handleUserIdSet = async () => {

            let userIdToShow = userId
            if(userId == 'me') {
                // show currently logged in user
                    const { data, error } = await supabase.auth.getSession()
                    if(!data.session) {
                        // no session -> reroute to users page
                        router.push('/users')
                    }
                    if(data?.session?.user) {
                        userIdToShow = data.session.user.id
                    }
            }

            const { data, error } = await supabase.from('profiles').select().eq('id', userIdToShow)
            
            if(data && data.length == 1) {
                userSetter(data[0])
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
            {
                user &&

                <h4>{user.first_name} {user.last_name}</h4>
            }
        </>
    )
}

export default Profile