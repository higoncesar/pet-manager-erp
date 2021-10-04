export default {
  fontFamily: ["'Titillium Web'", 'sans-serif'].join(','),
  banner: {
    fontFamily: 'NaughtyMonster',
    color: 'white',
    fontSize: 60,
    fontWeight: 'normal',
  },
}

declare module '@material-ui/core/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    banner: true
  }
}
