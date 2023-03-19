import { PostModel } from '@lib/models'
import { ezPromise } from '@lib/utility'
import { useUser } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './_post-card.module.scss'
import moment from 'moment'


type Props = {
    post?: PostModel
    postId?: number
}

const PostCard = ({
    post,
    postId
}: Props) => {

    const user = useUser()


    const [postToDisplay, postToDisplaySetter] = useState<PostModel>()


    useEffect(() => {
        const loadHandler = async () => {
            if(post) {
                postToDisplaySetter(post)
            }
            else {
                // load the post
                const { data: postFound, error: postFetchError } = await ezPromise(axios.get('/api/posts/1'))

                if(postFetchError) {
                    alert('Failed to get post')
                }
                else {
                    postToDisplaySetter(postFound)
                }
            }
        }

        loadHandler()

    }, [])

    return (
        <div className={styles['post-card']}>
            {
                postToDisplay ?

                <>
                {/* title */}
                <h5>{postToDisplay.title}</h5>

                {/* description */}
                <p>{postToDisplay.summary}</p>

                {/* last updated */}
                <p>Last updated on: {moment().format('MMM Do YYYY')} at {moment().format('h:m')}</p>
                </>

                :

                <>Loading</>
            }
        </div>
    )
}

export default PostCard