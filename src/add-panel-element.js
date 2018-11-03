const AppsManager = require('./apps-manager')

class AddProgramElement extends HTMLElement {
  constructor () {
    super()

    this.apps = new AppsManager()
    this.importDOMElements()
    this.attachDOMEvents()
  }

  attachDOMEvents () {
    this.dragDropPanel.ondragover = () => { return false }
    this.dragDropPanel.ondragleave = () => { return false }
    this.dragDropPanel.ondragend = () => { return false }
    this.dragDropPanel.ondrop = event => {
      event.preventDefault()

      this.modalPanel.classList.add('active')
      this.modalPanelInput.focus()

      for (let file of event.dataTransfer.files) {
        this.currentFileName = file.name.split('.')
        this.currentFilePath = file.path
      }

      return false
    }

    this.modalPanelSubmitBtn.addEventListener('click', () => {
      this.apps.add(this.modalPanelInput.value || this.currentFileName, this.currentFilePath)
      this.apps.loadApps()
      this.modalPanel.classList.remove('active')
      this.modalPanelInput.value = ''
    })

    this.modalPanelCloseBtn.addEventListener('click', () => {
      this.modalPanel.classList.remove('active')
    })
  }

  importDOMElements () {
    this.dragDropPanel = document.querySelector('.drop-panel')
    this.modalPanel = document.querySelector('.add-modal')
    this.modalPanelInput = document.querySelector('.add-modal .modal-input')
    this.modalPanelSubmitBtn = document.querySelector('.submit-name-btn')
    this.modalPanelCloseBtn = document.querySelector('.close-modal-btn')
  }
}

customElements.define('add-program-panel', AddProgramElement)
