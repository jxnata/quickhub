import { connect } from '@/helpers/database'
import Users from '@/models/users'
import IUser from '@/models/users/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { email } = req.query

    await connect()

    const user = await Users.findOne({ email })

    res.status(200).json({ user })
}

type ResponseData = {
    user: IUser | null
}