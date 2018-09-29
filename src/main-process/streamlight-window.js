const { BrowserWindow } = require('electron')
const Config = require('../config')
const mkdir = require('mkdirp')
const path = require('path')
const fs = require('fs')
const url = require('url')

module.exports =
class StreamlightWindow {
  constructor (options) {
    this.developmentMode = options.developmentMode
    this.keepForeground = options.foreground
    this.displayWindowLimits = options.windowLimits

    this.preferences = {
      width: 740,
      height: 490,
      maximizable: false,
      resizable: false,
      skipTaskbar: false,
      disableAutoHideCursor: true,
      alwaysOnTop: true,
      transparent: true,
      frame: false,
      show: false
    }

    if (this.displayWindowLimits) this.preferences.backgroundColor = '#c1c1c1'

    this.iconPath = path.resolve('./resources/icons/icon.png')
    // An icon is only necessary for Linux, as Windows and MacOS takes
    // the window's icon from the app's executable.
    if (process.platform === 'linux') this.preferences.icon = this.iconPath

    this.browserWindow = new BrowserWindow(this.preferences)

    this.browserWindow.loadURL(url.format({
      protocol: 'file',
      pathname: path.join(__dirname, '..', '..', 'static/index.html'),
      slashes: true
    }))
  }

  close () {
    this.browserWindow.close()
  }

  focus () {
    this.browserWindow.focus()
  }

  show () {
    this.browserWindow.show()
  }

  hide () {
    this.browserWindow.hide()
  }

  isVisible () {
    this.browserWindow.isVisible()
  }

  minimize () {
    this.browserWindow.minimize()
  }

  isMinimized () {
    this.browserWindow.isMinimized()
  }

  restore () {
    this.browserWindow.restore()
  }
}
