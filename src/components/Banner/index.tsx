import Image from 'next/image'
import DogBanner from '@/assets/images/dog-banner.png'
import { Box, Typography } from '@material-ui/core'

const Banner = () => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: [5, 5, 0],
      }}
    >
      <Box sx={{ display: ['none', 'none', 'flex'] }}>
        <Image src={DogBanner} alt="dog glasses" />
      </Box>
      <Box>
        <Typography variant="banner" component="h2">
          Mês do
        </Typography>
        <Typography variant="banner" component="h2">
          Cachorro Louco
        </Typography>
        <Typography color="warning.light" fontSize={20} fontWeight="600">
          Ajude na prevenção!
        </Typography>
        <Typography color="white">
          Ofereça sempre as{' '}
          <Typography color="warning.light" component="span">
            vacinaçoes
          </Typography>{' '}
          para os tutores dos Pet
        </Typography>
      </Box>
    </Box>
  )
}

export default Banner
