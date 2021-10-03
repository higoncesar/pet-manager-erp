export default {
  primary: {
    light: '#6da8de',
    main: '#3080cb',
    dark: '#124169',
  },
  secondary: {
    light: '#97e6c3',
    main: '#48d096',
    dark: '#228e61',
  },
  warning: {
    light: '#fade84',
    main: '#f6c428',
    dark: '#ac850b',
  },
  error: {
    light: '#fa6781',
    main: '#f72447',
    dark: '#dd0c2e',
  },
  success: {
    light: '#4fbec4',
    main: '#3aa6ac',
    dark: '#298186',
  },
}

declare module '@material-ui/core' {
  interface Palette {
    customPallet: Palette['primary']
  }
}
