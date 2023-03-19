import { PostModel } from '@lib/models'
import { ezPromise } from '@lib/utility'
import styles from '@Styles/_user-post.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


type Props = {

}

const PostPage = ({

}: Props) => {

    const router = useRouter()
    const { pid: postId } = router.query


    const [post, postSetter] = useState<PostModel>()



    // on load
    useEffect(() => {

        const loadHandler = async () => {

            const { data: blogFound, error: blogFetchError } = await ezPromise(axios.get(`/api/posts/${postId}`))

            if(blogFetchError) {
                router.push('/404')
            }

            postSetter(blogFound)
        }

        if(router.isReady) {
            loadHandler()
        }

    }, [router.isReady])





    return (
        <>
        {
            post ?

            <h1>{post.title}</h1>

            :

            <h1>Loading</h1>
        }
        blog post - {postId}
        </>
    )
}

export default PostPage