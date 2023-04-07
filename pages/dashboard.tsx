import { Skeleton } from '@mui/material'
import styles from '@Styles/_dashboard.module.scss'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import PostCard from '@Components/post-card/post-card'
import { ezPromise } from '@lib/utility'
import axios from 'axios'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'


type Props = {

}

const loadingDelayMilliseconds = 2000

const NewComponent = ({

}: Props) => {


    const supabaseClient = useSupabaseClient()

    const user = useUser()

    const router = useRouter()


    const [loadingDelayOver, loadingDelayOverSetter] = useState(false)

    const [userPosts, userPostsSetter] = useState<any[]>([])


    useEffect(() => {
        const asyncHandler = async () => {
            if(user) {
                console.log(user.id)
                const { data: postsFound, error: postsFetchError } = await ezPromise(fetchUserPosts(user.id))

                if(!postsFetchError) {
                    userPostsSetter(postsFound)
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



    async function fetchUserPosts(userId: string) {
        /**
         * Get all the posts for whichever userId is provided
         */
        
        const { data: postsFound, error: postsFetchError } = await supabaseClient.from('Posts').select().eq('author_id', userId)

        if(postsFetchError) {
            throw postsFetchError
        }

        return postsFound
    }



    function onCreatePostBtnClick() {
        router.push('/posts/new')
    }


    function onPostCardClick(postId: string) {
        router.push(`/posts/${postId}/view`)
    }





    return (
        <div id={styles['dashboard-wrapper']}>
        
        {
            user && loadingDelayOver ?

            <>
                <h1 id={styles['welcome-msg']}>Welcome {user.email}</h1>


                <div id={styles['quick-action-buttons']}>

                    {/* create post button */}
                    <div id={styles['create-new-post-btn']} onClick={e => onCreatePostBtnClick()}>
                        <AiOutlinePlus color="#C7C7C7" />
                    </div>
                    
                </div>

                <div id={styles['post-grid']}>
                    {
                        userPosts.map((userPost, i) => {
                            return <PostCard key={i} post={userPost} onClick={() => onPostCardClick(userPost.id)} />
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