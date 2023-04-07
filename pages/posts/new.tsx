import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from './_new-post.module.scss'
import * as yup from 'yup'
import supabase from '@lib/supabase-browser'
import { useRouter } from 'next/router'


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

const NewPostPage = ({

}: Props) => {


    const router = useRouter()


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
            console.log('creating post')
            createPost(data).then(res => {
                console.log('success')
            })
            .catch(e => {
                console.log('error : ', e)
            })
        }), err => {
            console.log('invalid post data')
        })()

    }


    async function createPost(formData: PostInputs) {

        const currentUser = await supabase.auth.getUser()

        const authorId = currentUser?.data?.user?.id

        if(!authorId) {
            router.push('/dashboard')
        }

        supabase.from('Posts').insert({
            author_id: authorId,
            is_draft: false,
            title: formData.title,
            description: formData.description,
            content: formData.content,
            is_private: false
        }).then(res => {
            console.log('back : ', res)
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

                <div onClick={e => onCreatePostBtnClick()} id={styles['create-post-btn']}>Create Post</div>

            </div>

            <div id={styles['right-side-quick-options']}></div>
        </div>
    )
}

export default NewPostPage