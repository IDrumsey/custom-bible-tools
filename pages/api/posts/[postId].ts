import { PostModel } from '@lib/models'
import { ezPromise } from '@lib/utility'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as yup from 'yup'

type Data = 

{
  post: PostModel
} |

{
    error: any
}

const inputDataValidationSchema = yup.number().required()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // validate input data
    const { data: validatedInputData, error: inputDataValidationError } = await ezPromise<PostModel, yup.ValidationError>(inputDataValidationSchema.validate(req.query.postId))

    if(inputDataValidationError) {
        return res.status(400).json({
            error: inputDataValidationError
        })
    }
  
    // get the post from the database
    const { data: postRes, error } = await ezPromise(axios.get(`http://localhost:3001/posts/${req.query.postId}`))

    if(error) {
        return res.status(500).json({
            error: 'Failed to fetch the post'
        })
    }

    return res.status(200).json({
        post: postRes.data
    })

}
