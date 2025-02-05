// fontawsome icon
// const statusIcon = {
//   success: 'circle-check',
//   info: 'circle-info',
//   danger: 'circle-exclamation',
//   attention: 'triangle-exclamation',
//   importance: 'star'
// }
//xeicon
const statusIcon = {
  success: 'xi-check-circle',
  info: 'xi-info',
  danger: 'xi-emoticon-devil',
  attention: 'xi-warning',
  importance: 'xi-star',
}
class Toast {
  constructor(type, contents, options) {
    this.type = type
    this.msg = contents
    this.options = options
    this.interval = null
    this.toast = null
    this.icon = null
    this.notify()
  }

  notify() {
    this.toast = document.createElement('div')
    this.toast.classList.add('toast', 'swing', 'active')
    // this.toast.style.width = this.options.maxWidth + 'px'
    const contents = this.setContents()
    this.setIcon()

    this.toast.classList.add(this.options.theme)
    contents.classList.add('toast-contents')
    this.toast.appendChild(contents)
    return this.toast
  }

  setContents() {
    const contents = document.createElement('div')

    if (this.options.useTitle && this.msg.title) {
      const title = document.createElement('h5')
      title.classList.add('title', 'ellipsis')
      title.innerHTML = this.msg.title
      contents.appendChild(title)
    }
    const content = document.createElement('div')
    content.classList.add('content', `${this.options.maxLine ? 'trunkcase' : ''}`)
    content.innerHTML = typeof this.msg === 'string' ? this.msg : this.msg.contents

    contents.appendChild(content)

    return contents
  }
  setIcon() {
    if (!this.options.useIcon) return
    this.icon = document.createElement('div')
    this.icon.classList.add('toast-icon', `${this.type}-text`)
    const iconClass = statusIcon[this.type] || 'xi-error'
    this.icon.innerHTML = `<i class="${iconClass}" />`
    this.toast.appendChild(this.icon)
  }
}

export default Toast
