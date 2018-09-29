const ProgramsManager = require('./programs-manager')

class AddProgramElement extends HTMLElement {
  constructor () {
    super()

    this.programs = new ProgramsManager()
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

      for (let file of event.dataTransfer.files) {
        this.currentFileName = file.name.split('.')
        this.currentFilePath = file.path
      }

      return false
    }

    this.modalPanelSubmitBtn.addEventListener('click', () => {
      this.modalPanel.classList.remove('active')
      this.modalPanelInput.value = ''
      this.programs.add(this.modalPanelInput.value || this.currentFileName, this.currentFilePath)
      this.programs.loadProgramsDB()
    })

    this.modalPanelCloseBtn.addEventListener('click', () => {
      this.modalPanel.classList.remove('active')
    })
  }

  importDOMElements () {
    this.dragDropPanel = document.querySelector('drag-drop-panel')
    this.modalPanel = document.querySelector('.modal-new-program-name')
    this.modalPanelInput = document.querySelector('.modal-new-program-name input')
    this.modalPanelSubmitBtn = document.querySelector('.submit-name-btn')
    this.modalPanelCloseBtn = document.querySelector('.close-modal-btn')
  }
}

customElements.define('add-program-panel', AddProgramElement)
