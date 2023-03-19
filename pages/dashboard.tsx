import { Skeleton } from '@mui/material'
import styles from '@Styles/_dashboard.module.scss'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import PostCard from '@Components/post-card/post-card'
import { PostModel } from '@lib/models'
import { ezPromise } from '@lib/utility'
import axios from 'axios'
import Link from 'next/link'


type Props = {

}

const loadingDelayMilliseconds = 2000

const NewComponent = ({

}: Props) => {


    const supabaseClient = useSupabaseClient()

    const user = useUser()

    const router = useRouter()


    const [loadingDelayOver, loadingDelayOverSetter] = useState(false)

    const [userPosts, userPostsSetter] = useState<PostModel[]>([])


    useEffect(() => {
        const asyncHandler = async () => {
            if(user) {
                console.log(user.id)
                const { data: postsFound, error: postsFetchError } = await ezPromise(axios.get(`/api/posts/posts?userId=${user.id}`).then(res => res.data))

                if(!postsFetchError) {
                    userPostsSetter(postsFound.posts)
                }
            }
        }

        asyncHandler()
    }, [user])


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


                {/* create post button */}
                
                <div><Link href='/posts/new'>Create New Post</Link></div>

                <div id="post-grid">
                    {
                        userPosts.map((userPost, i) => {
                            return <PostCard key={i} post={userPost} />
                        })
                    }
                </div>

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