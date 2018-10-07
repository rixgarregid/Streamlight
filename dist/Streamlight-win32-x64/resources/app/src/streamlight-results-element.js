const AppsManager = require('./apps-manager')

class StreamlightResultsElement extends HTMLElement {
  constructor () {
    super()
    this.renderHTML()

    this.apps = new AppsManager()

    this.apps.loadApps()
    this.appsObject = this.apps.getApps()

    this.loadResultsFromFile()
  }

  loadResultsFromFile () {
    for (let app in this.appsObject) {
      this.renderHTMLResult(app, this.appsObject[app])
    }
  }

  renderHTMLResult (name, path) {
    const resultElement = document.createElement('li')
    resultElement.classList.add('result')
    resultElement.innerText = name
    resultElement.setAttribute('path', path)

    this.resultList.appendChild(resultElement)
  }

  renderHTML () {
    this.resultList = document.createElement('ul')
    this.resultList.classList.add('result-list')

    this.appendChild(this.resultList)
  }
}

customElements.define('streamlight-results', StreamlightResultsElement)
