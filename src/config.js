const defaultSchema = require('./default-config-schema')
const fs = require('fs')

module.exports =
class Config {
  constructor (configFilePath) {
    this.configFilePath = configFilePath

    if (!fs.existsSync(this.configFilePath)) {
      this.createConfigFile(this.configFilePath)
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
    fs.writeFileSync(path, JSON.stringify(defaultSchema, null, 2))
    this.currentConfig = JSON.parse(fs.readFileSync(path))
  }
}
