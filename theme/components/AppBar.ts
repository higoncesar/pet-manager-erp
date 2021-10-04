import palette from 'theme/palette'
export default {
  styleOverrides: {
    root: {
      background: `linear-gradient(90deg, ${palette.secondary.dark} 0%, ${palette.secondary.main} 25% , ${palette.primary.main} 75%,${palette.primary.dark} 100%)`,
    },
  },
}
