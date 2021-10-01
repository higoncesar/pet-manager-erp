import TableLazy from '../TableLazy'
import {
  Modal,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
} from '@material-ui/core'
import { FC } from 'react'
import { FaDog, FaUser } from 'react-icons/fa'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

type ModalAnimalHistoricProps = {
  open: boolean
  onClose: () => void
  animal: any
}

const ModalAnimalHistoric: FC<ModalAnimalHistoricProps> = ({
  open,
  onClose,
  animal,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card style={style}>
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
    </Modal>
  )
}

export default ModalAnimalHistoric
