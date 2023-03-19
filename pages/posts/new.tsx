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
    title: yup.string().required().min(10).max(50),
    description: yup.string().max(200),
    content: yup.string().required()
})

const NewPostPage = ({

}: Props) => {


    const router = useRouter()


    const { register, handleSubmit: validateInput, formState: { errors: formErrors }} = useForm<PostInputs>({
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



    return (
        <>
            <input type="text" placeholder="Post Title" {...register('title')} />
            
            <input type="text" placeholder="Post Description" {...register('description')} />

            <input type="text" placeholder="Post Content" {...register('content')} />
            
            {
                formErrors.title?.message
            }

            <div onClick={e => onCreatePostBtnClick()} id={styles['create-post-btn']}>Create Post</div>
        </>
    )
}

export default NewPostPage