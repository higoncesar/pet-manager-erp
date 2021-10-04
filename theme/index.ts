import { createTheme } from '@material-ui/core'
import typography from './typography'
import components from './components'
import palette from './palette'

const theme = createTheme({
  typography,
  components,
  palette,
})

export default theme
