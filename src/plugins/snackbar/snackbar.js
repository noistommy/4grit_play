import Snack from './snack'

class Snackbars {
  constructor (options) {
    this.snackId = 0
    this.options = options
    this.snackbar = null
  }
  show(type, contents, options, pos = null) {
    const extendOption = { ...this.options, ...options }
    if (!extendOption.toast) {
      this.clear()
      this.snackId = 0
    }
    this.snackbar = this.getSnackbar(extendOption)

    let closeEl
    const snack = new Snack(type, contents, extendOption).snack
    if (extendOption.closeButton) {
      closeEl = this.setClose()
      snack.appendChild(closeEl)
    }
    if(pos) {
      this.snackbar.classList.add('anywhere')
      this.snackbar.style.top = pos.y + 'px'
      this.snackbar.style.left = pos.x + 'px'
    } else {
      this.snackbar.classList.add(extendOption.position)
    }
    
    snack.id = `snack_${this.snackId}`
    
    this.snackbar.appendChild(snack)
    
    this.snackId++

    const interval = extendOption.freeze
      ? null
      : setTimeout(() => this.hideSnack(snack, interval), extendOption.timeout)

    if (extendOption.closeButton) {
      console.log('close')
      closeEl.onclick = () => {
        this.hideSnack(snack, interval)
      }
    } else if (extendOption.clickToClose) {
      console.log(snack)
      snack.onclick = () => {
        this.hideSnack(snack, interval)
      }
    }
    
  }
  getSnackbar () {
      let snackbar = document.querySelector('.snackbars')
      if (snackbar) return snackbar

      snackbar = document.createElement('div')
      snackbar.classList.add('snackbars')


      document.body.appendChild(snackbar)
      return snackbar
  }
  setClose() {
    const closeButton = document.createElement('div')
    closeButton.classList.add('toast-close')
    closeButton.innerHTML = '<i class="fa fa-xmark" />'
    return closeButton
  }
  hideSnack (snack, interval) {
    console.log(this.snackId)
    this.snackId--
    snack.classList.remove('swing')
    snack.addEventListener('transitionend', () => {
      console.log('hide')
      this.removeSnack(snack)
      clearTimeout(interval)
    })
  }
  removeSnack (snack) {
    console.log(this.snackId)
    snack.remove()
    if (!this.snackId) {
      this.clear()
    }
  }
  clearSnack () {
    if (!this.snackbar) return
    const snacks = this.snackbar.querySelectorAll('.snack')
    snacks.forEach(t => {
      this.hideToast(t, null)
    })
  }
  clear() {
    if (this.snackbar) {
      this.snackbar.remove()
    }
  }
}

export default Snackbars