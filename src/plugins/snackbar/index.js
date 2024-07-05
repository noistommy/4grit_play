import Snackbars from './snackbar'

const defaultOptions = {
  useTitle: false,
  useIcon: false,
  // closeButton: true,
  position: 'bottom-center',
  round: false,
  theme: 'light',
  timeout: 5000,
  freeze: false,
  transition: 'swing',
  maxLine: 2,
  toast: false
}
  
let extendOptions = {}
const setOption = option => {
  return { ...defaultOptions, ...option }
}

export default {
  install(app, options = {}) {
    extendOptions = setOption(options)
    app.config.globalProperties.$snackbars = new Snackbars(extendOptions)
  }
}