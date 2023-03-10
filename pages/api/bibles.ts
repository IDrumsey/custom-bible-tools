// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Bible } from 'types/bible-api'
import { API_Error_Response } from './api'

type Data = Bible[] | API_Error_Response

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  

  // call the Bible api
  try {
    const bibleResponse = await axios.get(`${process.env.BIBLE_API_BASE_URL}/bibles`, {
      headers: {
        'api-key': process.env.BIBLE_API_KEY
      }
    })
    
    res.status(200).json(bibleResponse.data.data)
  }
  catch(e) {
    res.status(500).send({
      error: ''
    })
  }
}
