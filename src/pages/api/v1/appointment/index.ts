import type { NextApiRequest, NextApiResponse } from 'next'
import mockApointment from '../../../../__mocks__/appointments'

type Appointment = {
  id: number
  animal_id: number
  type: string
  details: string
  created_at: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Appointment[]>
) {
  const { skip, limit } = req.query
  const data = mockApointment.slice(Number(skip), Number(skip) + Number(limit))
  return res.status(200).json(data)
}
