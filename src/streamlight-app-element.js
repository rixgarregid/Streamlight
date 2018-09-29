const Config = require('./config')
const { remote } = require('electron')
const { app } = require('electron').remote
const path = require('path')
const os = require('os')

class StreamlightAppElement extends HTMLElement {
  constructor () {
    super()

    this.logEnvironmentInfo()

    this.config = new Config(path.resolve('config.json'))
    this.theme = this.config.get('theme')
    this.lang = this.config.get('lang')

    if (this.config.get('firstLaunch')) {
      remote.getCurrentWindow().show()
      this.displayWelcomeGuide()
      this.config.set('firstLaunch', false)
    }
  }

  set theme (theme) {
    this.setAttribute('theme', theme)
  }

  set lang (lang) {
    this.setAttribute('lang', lang)
  }

  get theme () {
    return this.getAttribute('theme')
  }

  get lang () {
    return this.getAttribute('lang')
  }

  getSystemInfo () {
    let systemOS
    let arch

    switch (process.platform) {
      case 'win32': systemOS = 'Windows'; break
      case 'linux': systemOS = 'Linux'; break
      case 'darwin': systemOS = 'MacOS'; break
    }

    switch (os.arch()) {
      case 'ia32': arch = '32-bit'; break
      case 'arm64': arch = '64-bit'; break
      case 'x32': arch = '32-bit'; break
      case 'x64': arch = '64-bit'; break
    }

    let platformRelease = os.release()

    return `${systemOS} ${platformRelease} ${arch}`
  }

  logEnvironmentInfo () {
    console.log(`Streamlight version: v${app.getVersion()}`)
    console.log(`Node version: ${process.version}`)
    console.log(`Running on: ${this.getSystemInfo()}`)
    console.log(`Exec path: ${process.execPath}`)
  }

  displayWelcomeGuide () {
    document.querySelector('welcome-guide').style.display = 'block'
    document.querySelector('.streamlight-results').classList.add('active')
    document.querySelector('.streamlight-results').style.height = 300 + 'px'
  }
}

customElements.define('streamlight-app', StreamlightAppElement)
