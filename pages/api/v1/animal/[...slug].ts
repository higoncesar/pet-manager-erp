import type { NextApiRequest, NextApiResponse } from 'next'
import mockAnimals from '../../../../__mocks__/animals'
import mockAppointments from '../../../../__mocks__/appointments'

type Animal = {
  id: number
  name: string
  animal_type: string
  birth: string
  owner: string
}

type Appointment = {
  id: number
  animal_id: number
  type: string
  details: string
  created_at: string
}

type Message = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animal | Message | Appointment[]>
) {
  const { slug } = req.query
  const [animal_id, appointment] = slug as string[]
  if (appointment) {
    const appointments = mockAppointments.filter(
      (appointment) => appointment.animal_id === Number(animal_id)
    )
    return res.status(200).json(appointments)
  }
  const animal = mockAnimals.find((animal) => animal.id === Number(animal_id))
  if (!animal) {
    return res.status(404).json({ message: 'Not found' })
  }
  return res.status(200).json(animal)
}
