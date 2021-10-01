import api from '@/config/api'

export interface AnimalResponse {
  id: number
  name: string
  animal_type: string
  birth: string
  owner: string
}

async function getList() {
  try {
    const { data } = await api.get<AnimalResponse[]>('animal?skip=0&limit=200')
    return data
  } catch (error) {
    throw new Error('Erro ')
  }
}

export default { getList }
