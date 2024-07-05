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
    this.snack.classList.add('snack', this.options.transition, 'active')

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
  setIcon () {}
}

export default Snack