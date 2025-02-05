import Toast from './toast'

class ToastBoard {
  constructor(options) {
    this.toastId = 0
    this.options = options
    this.board = null
  }
  show(type, contents, options, pos = null) {
    const extendOption = { ...this.options, ...options }
    if (extendOption.snackbar) {
      this.clear()
    }
    this.board = this.getBoard(extendOption)

    let closeEl
    const toastEl = new Toast(type, contents, extendOption).toast
    if (extendOption.closeButton) {
      closeEl = this.setClose()
      toastEl.appendChild(closeEl)
    }
    if (pos) {
      this.board.classList.add('anywhere')
      this.board.style.top = pos.y + 'px'
      this.board.style.left = pos.x + 'px'
    } else {
      this.board.classList.add(extendOption.position)
    }

    toastEl.id = `toast_${this.toastId}`

    this.board.appendChild(toastEl)

    this.toastId++

    const interval = extendOption.freeze
      ? null
      : setTimeout(() => this.hideToast(toastEl, interval), extendOption.timeout)

    if (extendOption.closeButton) {
      console.log('close')
      closeEl.onclick = () => {
        this.hideToast(toastEl, interval)
      }
    } else if (extendOption.clickToClose) {
      toastEl.onclick = () => {
        this.hideToast(toastEl, interval)
      }
    }
  }
  getBoard() {
    let board = document.querySelector('.toast-board')
    if (board) return board

    board = document.createElement('div')
    board.classList.add('toast-board')

    document.body.appendChild(board)
    return board
  }
  setClose() {
    const closeButton = document.createElement('div')
    closeButton.classList.add('toast-close')
    closeButton.innerHTML = '<i class="xi-close" />'
    return closeButton
  }
  hideToast(toast, interval) {
    this.toastId--
    toast.classList.remove('swing')
    toast.addEventListener('transitionend', () => {
      console.log('hide')
      this.removeToast(toast)
      clearTimeout(interval)
    })
  }
  removeToast(toast) {
    toast.remove()
    if (!this.toastId) {
      this.clear()
    }
  }
  clearToast() {
    if (!this.board) return
    const toasts = this.board.querySelectorAll('.toast')
    toasts.forEach((t) => {
      this.hideToast(t, null)
    })
  }
  clear() {
    if (this.board) {
      this.board.remove()
    }
  }
}

export default ToastBoard
