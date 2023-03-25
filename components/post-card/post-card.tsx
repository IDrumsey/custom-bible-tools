import { ezPromise } from '@lib/utility'
import { useUser } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './_post-card.module.scss'
import moment from 'moment'


type Props = {
    post?: any
    postId?: number
    onClick?: () => void
}

const PostCard = ({
    post,
    postId,
    onClick
}: Props) => {

    const user = useUser()


    const [postToDisplay, postToDisplaySetter] = useState<any>()


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
        <div className={styles['post-card']} onClick={() => {
            if(onClick) {
                onClick()
            }
        }}>
            {
                postToDisplay ?

                <>
                {/* title */}
                <h5 className={styles['post-title']}>{postToDisplay.title}</h5>

                {/* publish date */}
                <p className={styles['post-publish-date']}>{moment(postToDisplay.created_at).format('MMM DD, YYYY')} at {moment(postToDisplay.created_at).format('h:mma')}</p>

                {/* description */}
                <p className={styles['post-description']}>{postToDisplay.description}</p>

                </>

                :

                <>Loading</>
            }
        </div>
    )
}

export default PostCard