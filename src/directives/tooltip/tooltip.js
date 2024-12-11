
let ref = null
let opt = {}
const showTooltip = (el, binding) => {
  if (binding.value === '') return
  if (ref) hideTooltip()
  const ttEl = document.createElement('div')

  setAttributeRef(ttEl, binding)
  if (binding.value.self) {
    el.append(ttEl)
  } else {
    document.body.append(ttEl)
  }
  setPositionRef(el, binding, ttEl)
}

const setOptionsRel = (binding, options) => {
  opt = options
  binding.opt = {}
  binding.opt.trigger = binding.value.trigger || opt.trigger
}

const setAttributeRef = (reEl, binding) => {
  reEl.innerHTML = typeof binding.value === 'object' ? binding.value.contents : binding.value
  reEl.classList.add('base-tooltip', opt.customClass, `theme-${opt.theme}`, opt.size)
  reEl.style.maxWidth = binding.value.size ? binding.value.size + 'px' : opt.maxWidth + 'px'
  if (binding.value.padding) {
    reEl.style.padding = binding.value.padding
  }
  reEl.style.textAlign = binding.value.textAlign ? binding.value.textAlign : opt.textAlign
  ref = reEl
}

const setPositionRef = (el, binding, ref) => {
  const wW = window.innerWidth
  const wH = window.innerHeight
  let dir = binding.arg || 'top'
  let align = 'center'
  if (Object.keys(binding.modifiers).length > 0) {
    align = Object.keys(binding.modifiers)[0]
  }

  const ePos = el.getBoundingClientRect()
  const refPos = ref.getBoundingClientRect()
  const offset = opt.offset
  const alignOffset = binding.value.offset || 0
  let tPos = ePos.top - refPos.height - offset
  let bPos = ePos.bottom + offset

  let lPos = ePos.left - (refPos.width + offset)
  let rPos = ePos.right + offset

  if (dir === 'top' && tPos < 0) dir = 'bottom'
  if (dir === 'bottom' && wH - bPos - refPos.height < 0) dir = 'top'

  if (dir === 'left' && lPos < 0) dir = 'right'
  if (dir === 'right' && wW - (rPos + refPos.width) < 0) dir = 'left'

  if (dir === 'top' || dir === 'bottom') {
    ref.style.top = dir === 'top' ? `${tPos}px` : `${bPos}px`

    const cPos = ePos.left + (ePos.width - refPos.width) / 2
    const endPos = ePos.right - refPos.width

    if (ePos.width >= refPos.width) {
      align = 'center'
    } else {
      if (cPos < 0) {
        align = 'start'
      }
      if (wW - ePos.right - (refPos.width / 2 - ePos.width / 2) < 0) {
        align = 'end'
      }
    }
    ref.style.left =
      align === 'center' ? cPos + 'px' : align === 'end' ? alignOffset + endPos + 'px' : alignOffset + ePos.left + 'px'
  } else {
    ref.style.left = dir === 'left' ? `${lPos}px` : `${rPos}px`
    const cPos = ePos.top + ePos.height / 2 - refPos.height / 2
    const endPos = ePos.bottom - refPos.height

    if (ePos.height >= refPos.height) {
      align = 'center'
    } else {
      if (cPos < 0) {
        align = 'start'
      }
      if (wH - ePos.bottom - (refPos.height / 2 - ePos.height / 2) < 0) {
        align = 'end'
      }
    }
    ref.style.top =
      align === 'center' ? cPos + 'px' : align === 'end' ? endPos + 'px' : ePos.top + 'px'
  }

  ref.classList.add(`${dir}-${align}`)
}

const hideTooltip = () => {
  if (ref) ref.remove()
}

const tooltipDirective = (options) => {
  let show, hide
  const createEvent = (el, binding) => {
    show = () => {
      showTooltip(el, binding)
    }
    hide = () => {
      hideTooltip()
    }
    el.addEventListener('mouseenter', show)
    if (binding.opt && binding.opt.trigger === 'hover') {
      el.addEventListener('mouseleave', hide)
    } else {
      document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btf-tooltip')) return
        hide()
      })
    }
    document.body.addEventListener('wheel', hide)
  }
  const removeEvent = (el) => {
    if (show && hide) {
      hide()
      el.removeEventListener('mouseenter', show)
      el.removeEventListener('mouseleave', hide)
      document.body.removeEventListener('click', (e) => {
        if (e.target.classList.contains('btf-tooltip')) return
        hide()
      })
      document.body.removeEventListener('click', hide)
      document.body.removeEventListener('wheel', hide)
    }
  }
  return {
    created (el, binding) {
      removeEvent(el)
      setOptionsRel(binding, options)
    },
    mounted (el, binding) {
      createEvent(el, binding)
    },
    update (el, binding) {
      if (binding.value !== binding.oldValue) {
        createEvent(el, binding)
      }
    },
    onunmounted (el) {
      removeEvent(el)
    }
  }
}

export default tooltipDirective
