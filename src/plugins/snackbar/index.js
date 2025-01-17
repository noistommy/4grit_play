import Snackbars from './snackbar'

const defaultOptions = {
  useTitle: false,
  useIcon: true,
  clickToClose: true,
  closeButton: false,
  position: 'top-right',
  round: false,
  theme: 'light',
  timeout: 5000,
  freeze: false,
  transition: 'swing',
  maxLine: 3,
  maxWidth: 250,
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

    app.provide('$snackbars', new Snackbars(extendOptions))
  }
}