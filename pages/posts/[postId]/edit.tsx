import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from './_edit-post.module.scss'
import * as yup from 'yup'
import supabase from '@lib/supabase-browser'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


type Props = {

}


type PostInputs = {
    title: string,
    description: string,
    content: string
}

const postInputValidationSchema = yup.object().shape({
    title: yup.string().required().min(10).max(200),
    description: yup.string().max(500),
    content: yup.string().required()
})

const EditPostPage = ({

}: Props) => {


    const router = useRouter()

    const { postId } = router.query

    const [post, postSetter] = useState<any>()


    const fetchPost = async () => {

        const { data: postsFound, error: blogFetchError } = await supabase.from('Posts').select().eq('id', postId)

        if(blogFetchError) {
            router.push('/404')
        }

        if(postsFound && postsFound.length == 1) {

            const post = postsFound[0]

            postSetter(post)

            setValue('title', post.title)

            if(post.description)
                setValue('description', post.description)

            setValue('content', post.content)
        }
    }

    // on load
    useEffect(() => {

        if(router.isReady) {
            fetchPost()
        }

    }, [router.isReady])


    const { register, handleSubmit: validateInput, formState: { errors: formErrors }, setValue} = useForm<PostInputs>({
        resolver: yupResolver(postInputValidationSchema),
        defaultValues: {
            title: '',
            description: '',
            content: ''
        }
    })




    function onCreatePostBtnClick() {

        // validate input data
        validateInput((data => {
            // on success
            updatePost(data)
        }), err => {
            console.log('invalid post data')
        })()

    }


    async function updatePost(formData: PostInputs) {

        const currentUser = await supabase.auth.getUser()

        const authorId = currentUser?.data?.user?.id

        if(!authorId) {
            router.push('/dashboard')
        }

        // check that the currently signed in user id == post author
        if(authorId != post.author_id) {
            alert('You are not authorized to edit this post')
            return
        }

        supabase.from('Posts').update({
            title: formData.title,
            description: formData.description,
            content: formData.content
        }).eq('id', postId).then(res => {
            fetchPost()
        })
    }


    function onTitleChange(newTitle: string) {
        // if last input char was space then run the capitalization stuff
        const capitalizationCheckerTriggerChars = [' ', '?', '.']
        if(newTitle.length > 0) {
            if(capitalizationCheckerTriggerChars.includes(newTitle[newTitle.length - 1])) {
                setValue('title', capitalizeEachWord(newTitle, ['of', 'the', 'and']))
            }
            else {
                setValue('title', newTitle)
            }
        }

        else {
            setValue('title', newTitle)
        }
    }


    function capitalizeEachWord(sentence: string, exceptions: string[] = []): string {
        /**
         * Capitalizes each word in a sentence.
         * 
         * https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
         */

        // lower all exception words
        exceptions = exceptions.map(exception => exception.toLowerCase())

        // split the words by spaces
        let words = sentence.split(' ')

        // capitalize each word
        words = words.map(word => {
            if(exceptions.includes(word.toLowerCase())){
                return word
            }

            if(word.length > 0){
                return word[0].toUpperCase() + word.substring(1)
            }
            else{
                return word
            }
        })

        // rejoin words
        return words.join(' ')
    }




    return (
        <div id={styles['new-post-wrapper']}>

            <div id={styles['left-side-inputs']}>

                <div>
                    <h2 className={styles['input-title']}>Post Title</h2>
                    <input id={styles['post-title']} type="text" placeholder="Post Title" {...register('title')} onChange={e => onTitleChange(e.target.value)} />
                </div>

                <div>
                    <h2 className={styles['input-title']}>Post Description</h2>
                    <textarea id={styles['post-description']} placeholder="Post Description" {...register('description')} />
                </div>

                <div>
                    <h2 className={styles['input-title']}>Post Content</h2>
                    <textarea id={styles['post-content']} placeholder="Post Content" {...register('content')} />
                </div>
                
                {
                    formErrors.title?.message
                }

                <div onClick={e => onCreatePostBtnClick()} id={styles['create-post-btn']}>Update Post</div>

            </div>

            <div id={styles['right-side-quick-options']}></div>
        </div>
    )
}

export default EditPostPage
