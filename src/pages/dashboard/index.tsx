import Head from 'next/head'
import HeaderBar from '@/components/HeaderBar'
import ChartBar from '@/components/Chart/Bar'
import ChartPie from '@/components/Chart/Pie'
import TableLazy from '@/components/TableLazy'
import getDay from 'date-fns/getDay'
import animalServices, { AnimalResponse } from '@/services/http/animals'
import {
  Card,
  Box,
  CardContent,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'
import type { NextPage } from 'next'
import { useEffect, useState, useMemo, useCallback } from 'react'
import appointmentServices, {
  AppointmentResponse,
} from '@/services/http/appointments'
import { BsCardList } from 'react-icons/bs'
import ModalAnimalHistoric from '@/components/ModalAnimalHistoric'

const Home: NextPage = () => {
  const [appointmentList, setAppointmentList] = useState<AppointmentResponse[]>(
    []
  )
  const [animalList, setAnimalList] = useState<AnimalResponse[]>([])
  const [isMopenModalHistoric, setIsMopenModalHistoric] = useState(false)
  const [animalHistoric, setAnimalHistoric] = useState(undefined)
  const [loadingAnimalHistoric, setLoadingAnimalHistoric] = useState({
    animal_id: undefined,
  })

  useEffect(() => {
    appointmentServices.getList().then((response) => {
      setAppointmentList(response)
    })
    animalServices.getList().then((response) => setAnimalList(response))
  }, [])

  const chartTypeCare = useMemo(() => {
    const datasetsObject = appointmentList.reduce(
      (acc, appointment) => {
        const date = new Date(appointment.created_at)
        const dayOfTheWeek = getDay(date)
        acc[appointment.type].data[dayOfTheWeek] =
          acc[appointment.type].data[dayOfTheWeek] + 1
        return acc
      },
      {
        ROUTINE: {
          label: 'Rotina',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#5ab1e9',
        },
        EMERGENCY: {
          label: 'Emergência',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#fc6485',
        },
        RETURN: {
          label: 'Retorno',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#4ec2bc',
        },
        VACCINE: {
          label: 'Vacinação',
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: '#fcdf97',
        },
      }
    )
    return Object.keys(datasetsObject).map((i) => datasetsObject[i])
  }, [appointmentList])

  const chartMostAttendedAnimals = useMemo(() => {
    if (!appointmentList.length || !animalList.length) {
      return { labels: [], data: [] }
    }
    const objectQuantityTypes = appointmentList.reduce(
      (cc, appointment) => {
        const animal = animalList.find(
          (animal) => animal.id === appointment.animal_id
        )
        if (cc[animal?.animal_type]) {
          cc[animal?.animal_type].quantity =
            cc[animal?.animal_type].quantity + 1
        }
        return cc
      },
      {
        DOG: { label: 'Cachorro', quantity: 0 },
        CAT: { label: 'Gato', quantity: 0 },
        FISH: { label: 'Peixe', quantity: 0 },
        SNAKE: { label: 'Cobra', quantity: 0 },
        TIGER: { label: 'Tigre', quantity: 0 },
        OTHER: { label: 'Outros', quantity: 0 },
      }
    )
    return Object.values(objectQuantityTypes).reduce(
      (cc, data) => {
        cc.labels.push(data.label)
        cc.data.push(data.quantity)
        return cc
      },
      {
        labels: [],
        data: [],
      }
    )
  }, [appointmentList, animalList])

  const handleShowAnimalHistoric = useCallback(
    async (animal) => {
      setLoadingAnimalHistoric({ animal_id: animal.id })
      const appointments = await animalServices.getAppointmentsById(animal.id)
      const historic = { ...animal, appointments }
      setAnimalHistoric(historic)
      setLoadingAnimalHistoric({ animal_id: undefined })
      setIsMopenModalHistoric(true)
    },
    [animalHistoric]
  )

  const historicColumn = useCallback(
    (animal) => {
      return (
        <Tooltip title="Histórico">
          <IconButton
            color="primary"
            onClick={() => {
              handleShowAnimalHistoric(animal)
            }}
          >
            {loadingAnimalHistoric.animal_id === animal.id ? (
              <CircularProgress />
            ) : (
              <BsCardList />
            )}
          </IconButton>
        </Tooltip>
      )
    },
    [loadingAnimalHistoric]
  )

  return (
    <Stack sx={{ flexGrow: 1 }} spacing={6}>
      <Head>
        <title>Pet Manager ERP - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar title="Dashboard" />
      <Stack
        sx={{ flexGrow: 1 }}
        spacing={6}
        padding={['0 20px 20px', null, '0 100px 100px']}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', null, null, 'repeat(2, 1fr)'],
            gap: 2,
          }}
        >
          <Card>
            <CardContent sx={{ height: 400 }}>
              <Typography variant="subtitle1" textAlign="center">
                Tipo de atendimento
              </Typography>
              <ChartBar
                labels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
                datasets={chartTypeCare}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ height: 400 }}>
              <Typography variant="subtitle1" textAlign="center">
                Tipo animais mais atendidos
              </Typography>
              <ChartPie
                labels={chartMostAttendedAnimals.labels}
                data={chartMostAttendedAnimals.data}
                backgroundColor={[
                  '#5ab1e9',
                  '#fc6485',
                  '#4ec2bc',
                  '#48565e',
                  '#fcdf97',
                  '#0a2034',
                ]}
              />
            </CardContent>
          </Card>
        </Box>
        <Box>
          <ModalAnimalHistoric
            open={isMopenModalHistoric}
            onClose={() => setIsMopenModalHistoric(false)}
            animal={animalHistoric}
          />
          <TableLazy
            data={animalList}
            header={[
              { key: 'name', cell: 'Nome' },
              { key: 'birth', cell: 'Nascimento', isDate: true },
              { key: 'animal_type', cell: 'Espécie' },
              { key: 'owner', cell: 'Tutor' },
            ]}
            customColunm={[
              {
                header: { cell: 'Histórico' },
                cell: historicColumn,
              },
            ]}
          />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Home