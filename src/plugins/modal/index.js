import './be-modal.scss'
import BeTeleport from './BeTeleport.vue'
import mitt from 'mitt'
const defaultModalOptions = {
  useStack: true,
  clickToClose: true,
  escapeToClose: true
}
let extendOptions = {}
const setOption = modalOption => {
  return { ...defaultModalOptions, ...modalOption }
}

const init = () => {
  const emitter = mitt()
  const show = ({ comp, props, options, handler }) => {
    emitter.emit('show-modal', { comp, props, options, handler })
  }
  const close = modalId => {
    emitter.emit('close-modal', modalId)
  }
  const closeAll = () => {
    emitter.emit('close-all-modal')
  }
  return { show, close, closeAll, emitter }
}

export default {
  install(app, options = {}) {
    // app.config.globalProperties.$beModal = init()
    app.provide('$beModal', init())
    extendOptions = setOption(options)
    const extendComp = { extends: BeTeleport, props: { options: { type: Object, default: () => extendOptions } } }
    app.component('BeTeleport', extendComp)
  }
}