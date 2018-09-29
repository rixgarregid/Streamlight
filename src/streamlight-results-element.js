const ProgramsManager = require('./programs-manager')

class StreamlightResultsElement extends HTMLElement {
  constructor () {
    super()
    this.renderHTML()
    this.attachCommandElements()

    this.programs = new ProgramsManager()

    this.programs.loadProgramsDB()
    this.programsObject = this.programs.getProgramsDB()

    this.loadResultsFromFile()
  }

  loadResultsFromFile () {
    for (let program in this.programsObject) {
      this.renderHTMLResult(program, this.programsObject[program])
    }
  }

  renderHTMLResult (name, path) {
    const resultElement = document.createElement('li')
    resultElement.classList.add('result')
    resultElement.innerText = name
    resultElement.setAttribute('path', path)

    this.resultList.appendChild(resultElement)
  }

  attachCommandElements () {
    this.reloadCommandElement = document.createElement('li')
    this.reloadCommandElement.innerText = 'Streamlight: Reload'
    this.reloadCommandElement.classList.add('result')
    this.reloadCommandElement.classList.add('reload-command-result-item')
    this.reloadCommandElement.classList.add('streamlight-command-result')

    this.quitCommandElement = document.createElement('li')
    this.quitCommandElement.innerText = 'Streamlight: Quit'
    this.quitCommandElement.classList.add('result')
    this.quitCommandElement.classList.add('quit-command-result')
    this.quitCommandElement.classList.add('streamlight-command-result')

    this.resultList.appendChild(this.reloadCommandElement)
    this.resultList.appendChild(this.quitCommandElement)
  }

  renderHTML () {
    this.resultList = document.createElement('ul')
    this.resultList.classList.add('result-list')

    this.appendChild(this.resultList)
  }
}

customElements.define('streamlight-results', StreamlightResultsElement)
