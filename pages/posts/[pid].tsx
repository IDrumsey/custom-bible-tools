import supabase from '@lib/supabase-client'
import { ezPromise } from '@lib/utility'
import styles from '@Styles/_user-post.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import moment from 'moment'


type Props = {

}

const PostPage = ({

}: Props) => {

    const router = useRouter()
    const { pid: postId } = router.query


    const [post, postSetter] = useState<any>()



    // on load
    useEffect(() => {

        const loadHandler = async () => {

            const { data: postsFound, error: blogFetchError } = await supabase.from('Posts').select().eq('id', postId)

            if(blogFetchError) {
                router.push('/404')
            }

            if(postsFound && postsFound.length == 1) {
                postSetter(postsFound[0])
            }
        }

        if(router.isReady) {
            loadHandler()
        }

    }, [router.isReady])





    return (
        <div style={{color: '#C1C1C1', padding: '24px 64px', marginTop: '32px'}}>
            {
                post ?

                <div style={{display: 'flex', flexDirection: 'column', rowGap: '16px'}}>

                <h1>{post.title}</h1>

                <p>{moment().format('MMM DD, YYYY')} at {moment().format('h:ma')}</p>

                <p>{post.description}</p>

                <p>{post.content}</p>

                </div>

                :

                <h1>Loading</h1>
            }
        </div>
    )
}

export default PostPage