const KeymapManager = require('./keymap-manager')

class KeymapPanelElement extends HTMLElement {
  constructor () {
    super()

    this.keymap = new KeymapManager()

    this.importDOMElements()
    this.attachDOMEvents()
    this.loadKeymap()
  }

  loadKeymap () {
    this.toggleKeyInput.value = this.keymap.get('toggle')
    this.reloadKeyInput.value = this.keymap.get('reload')
    this.centerKeyInput.value = this.keymap.get('center')
  }

  attachDOMEvents () {
    this.toggleKeyInput.addEventListener('blur', () => {
      this.keymap.set('toggle', this.toggleKeyInput.value)
    })

    this.reloadKeyInput.addEventListener('blur', () => {
      this.keymap.set('reload', this.reloadKeyInput.value)
    })

    this.centerKeyInput.addEventListener('blur', () => {
      this.keymap.set('center', this.centerKeyInput.value)
    })
  }

  importDOMElements () {
    this.toggleKeyInput = document.querySelector('.field.toggle-key input')
    this.reloadKeyInput = document.querySelector('.field.reload-key input')
    this.centerKeyInput = document.querySelector('.field.center-key input')
  }
}

customElements.define('keymap-panel', KeymapPanelElement)
