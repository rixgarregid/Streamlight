const AppsManager = require('./apps-manager')
const iconExtractor = require('icon-extractor')
const fs = require('fs')
const path = require('path')

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

  renderHTMLResult (name, exePath) {
    const resultElement = document.createElement('li')
    resultElement.classList.add('list-item')
    resultElement.classList.add('result')
    resultElement.innerText = name
    resultElement.setAttribute('path', exePath)

    // Check if the path ends with .exe
    if (exePath.endsWith('.exe')) {
      iconExtractor.emitter.on('icon', data => {
        fs.writeFile(path.resolve(`data/${name}.png`), data.Base64ImageData, 'base64', (err) => {
          if (err) console.log(err)
        })
      })
    }

    resultElement.setAttribute('icon', path.resolve(`data/${name}.png`))

    this.resultList.appendChild(resultElement)
  }

  renderHTML () {
    this.resultList = document.createElement('ul')
    this.resultList.classList.add('result-list')
    this.resultList.classList.add('list')

    this.appendChild(this.resultList)
  }
}

customElements.define('streamlight-results', StreamlightResultsElement)
