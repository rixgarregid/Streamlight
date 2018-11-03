const path = require('path')
const fs = require('fs')
const iconExtractor = require('icon-extractor')

module.exports =
class AppsManager {
  constructor () {
    this.apps = {}
    this.appsFilePath = path.resolve('apps.json')
    this.loadApps()
  }

  loadApps () {
    if (fs.existsSync(this.appsFilePath)) {
      this.apps = JSON.parse(fs.readFileSync(this.appsFilePath))
    } else {
      this.createAppsFile()
    }
  }

  getApps () {
    return this.apps
  }

  add (name, appPath) {
    this.loadApps()

    this.apps[name] = appPath
    this.renderHTMLResult(name, appPath)
    fs.writeFileSync(this.appsFilePath, JSON.stringify(this.apps, null, 2))
  }

  renderHTMLResult (name, path) {
    const resultElement = document.createElement('li')
    resultElement.classList.add('list-item')
    resultElement.classList.add('result')
    resultElement.innerText = name
    resultElement.setAttribute('path', path)



    iconExtractor.emitter.on('icon', data => {
      fs.writeFile(path.resolve(`data/${name}.png`), data.Base64ImageData, 'base64', err => {
        console.log(err)
      })
    })

    resultElement.setAttribute('icon', path.resolve(`data/${name}.png`))

    document.querySelector('.result-list').appendChild(resultElement)
  }

  createAppsFile () {
    fs.closeSync(fs.openSync(this.appsFilePath, 'w'))
    fs.writeFileSync(this.appsFilePath, JSON.stringify(this.apps, null, 2))
    this.apps = JSON.parse(fs.readFileSync(this.appsFilePath))
  }
}
