const statusIcon = {
  success: 'circle-check',
  info: 'circle-info',
  danger: 'circle-exclamation',
  attention: 'triangle-exclamation',
  importance: 'star'
}
class Snack {
  constructor(type, contents, options) {
    this.type = type
    this.msg = contents
    this.options = options
    this.interval = null
    this.snack = null
    this.icon = null
    this.notify()
  }

  notify() {
    this.snack = document.createElement('div')
    this.snack.classList.add('snack', 'swing', 'active')
    this.snack.style.maxWidth = this.options.maxWidth + 'px'
    const contents = this.setContents()
    this.setIcon()

    this.snack.classList.add(this.options.theme)
    contents.classList.add('snack-contents')
    this.snack.appendChild(contents)
    return this.snack
  }

  setContents () {
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
  setIcon () {
    if(!this.options.useIcon) return 
    this.icon = document.createElement('div')
    this.icon.classList.add('toast-icon', `${this.type}-text`)
    const iconClass = statusIcon[this.type] || 'hexagon-exclamation'
    this.icon.innerHTML = `<i class="fa fa-${iconClass}" />`
    this.snack.appendChild(this.icon)
  }
}

export default Snack