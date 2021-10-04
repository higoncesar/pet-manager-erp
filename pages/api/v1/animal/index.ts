import type { NextApiRequest, NextApiResponse } from 'next'
import mockAnimals from '../../../../__mocks__/animals'

type Data = {
  id: number
  name: string
  animal_type: string
  birth: string
  owner: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { skip, limit } = req.query
  const data = mockAnimals.slice(Number(skip), Number(skip) + Number(limit))
  return res.status(200).json(data)
}
