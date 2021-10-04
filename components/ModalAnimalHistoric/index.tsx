import TableLazy from '../TableLazy'
import {
  Modal,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  Box,
} from '@material-ui/core'
import { FC } from 'react'
import { FaDog, FaUser } from 'react-icons/fa'

type Appointment = {
  animal_id: number
  created_at: string
  details: string
  id: number
  type: string
}

type Animal = {
  animal_type: string
  birth: string
  id: number
  name: string
  owner: string
  appointments: Appointment[]
}

type ModalAnimalHistoricProps = {
  open: boolean
  onClose: () => void
  animal: Animal
}

const ModalAnimalHistoric: FC<ModalAnimalHistoricProps> = ({
  open,
  onClose,
  animal,
}) => {
  return (
    <Modal open={open} onClose={onClose} data-testid="modal-animal-historic">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          maxWidth: '90vw',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} alignItems="flex-end">
                <Typography variant="h5" component="div">
                  <FaDog /> {animal?.name}
                </Typography>
                <Typography color="text.secondary">
                  <FaUser /> {animal?.owner}
                </Typography>
              </Stack>
              <Divider />
              <Typography variant="h6" component="h2">
                Histórico de atendimentos
              </Typography>
              <TableLazy
                header={[
                  { key: 'type', cell: 'Tipo' },
                  { key: 'created_at', cell: 'Data', isDate: true },
                  { key: 'details', cell: 'Descrição' },
                ]}
                data={animal?.appointments}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default ModalAnimalHistoric
