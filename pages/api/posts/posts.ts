import { PostModel } from '@lib/models'
import { ezPromise } from '@lib/utility'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'


type Data = {
    posts: PostModel
}

|

{
    error: any
}


const inputDataValidationSchema = yup.object().shape({
    userId: yup.number()
})


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // validate input data
    const { data: validatedInputData, error: inputDataValidationError } = await ezPromise(inputDataValidationSchema.validate(req.body || {}))

    if(inputDataValidationError) {
        return res.status(400).json({
            error: inputDataValidationError
        })
    }

    let url = 'http://localhost:3001/posts'

    if(validatedInputData.userId) {
        url += `?authorId=${validatedInputData.userId}`
    }

    // get the posts from the database
    const { data: postsFound, error: postsFetchError } = await ezPromise(axios.get(url).then(res => res.data))

    if(postsFetchError) {
        return res.status(404).json({
            error: 'Failed to fetch the posts'
        })
    }



    return res.status(200).json({
        posts: postsFound
    })
}
