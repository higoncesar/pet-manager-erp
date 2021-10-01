import api from '@/config/api'

export interface AppointmentResponse {
  id: number
  animal_id: number
  type: 'VACCINE' | 'EMERGENCY' | 'ROUTINE' | 'RETURN'
  details: string
  created_at: string
}

async function getList() {
  try {
    const { data } = await api.get<AppointmentResponse[]>(
      'appointment?skip=0&limit=100'
    )
    return data
  } catch (error) {
    throw new Error('Erro ')
  }
}

export default { getList }
