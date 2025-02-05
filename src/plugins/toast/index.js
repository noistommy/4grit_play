import ToastBoard from './toastBoard'
import './toast.scss'

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
  snackbar: false,
}

let extendOptions = {}
const setOption = (option) => {
  return { ...defaultOptions, ...option }
}

export default {
  install(app, options = {}) {
    extendOptions = setOption(options)
    app.config.globalProperties.$toast = new ToastBoard(extendOptions)

    app.provide('$toast', new ToastBoard(extendOptions))
  },
}
