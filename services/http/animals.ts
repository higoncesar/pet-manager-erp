import api from '@/config/api'

export interface AnimalResponse {
  [x: string]: any
  id: number
  name: string
  animal_type: 'DOG' | 'CAT' | ' FISH' | 'SNAKE' | 'TIGER' | ' OTHER'
  birth: string
  owner: string
}

export interface Appointment {
  id: number
  animal_id: number
  type: string
  details: string
  created_at: string
}

async function getList() {
  try {
    const { data } = await api.get<AnimalResponse[]>('animal?skip=0&limit=200')
    return data
  } catch (error) {
    throw new Error('Erro ')
  }
}

async function getAppointmentsById(id: number) {
  try {
    const { data } = await api.get<AnimalResponse[]>(`animal/${id}/appointment`)
    return data
  } catch (error) {
    throw new Error('Erro ')
  }
}

export default { getList, getAppointmentsById }
