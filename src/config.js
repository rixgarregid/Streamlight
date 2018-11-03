const defaultConfig = require('./defaults/config-default')
const fs = require('fs')
const path = require('path')

module.exports =
class Config {
  constructor () {
    this.configFilePath = path.resolve('config.json')

    if (!fs.existsSync(this.configFilePath)) {
      this.createConfigFile(this.configFilePath)
      fs.writeFileSync(process.execPath, this.configFilePath)
    } else {
      this.currentConfig = JSON.parse(fs.readFileSync(this.configFilePath))
    }
  }

  set (keyPath, value) {
    this.currentConfig[keyPath] = value
    fs.writeFileSync(this.configFilePath, JSON.stringify(this.currentConfig, null, 2))
  }

  get (keyPath) {
    return this.currentConfig[keyPath]
  }

  createConfigFile (path) {
    fs.closeSync(fs.openSync(path, 'w'))
    fs.writeFileSync(path, JSON.stringify(defaultConfig, null, 2))
    this.currentConfig = JSON.parse(fs.readFileSync(path))
  }
}
