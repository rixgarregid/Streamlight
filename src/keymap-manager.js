const keymapDefaults = require('./defaults/keymap-defaults')
const path = require('path')
const fs = require('fs')

module.exports =
class KeymapManager {
  constructor () {
    this.keymapFile = path.resolve('keymap.json')
    this.loadKeymap()
  }

  loadKeymap () {
    if (fs.existsSync(this.keymapFile)) {
      this.keymap = JSON.parse(fs.readFileSync(this.keymapFile))
    } else {
      this.createKeymapFile()
    }
  }

  set (keyPath, value) {
    this.keymap[keyPath] = value
    fs.writeFileSync(this.keymapFile, JSON.stringify(this.keymap, null, 2))
  }

  get (keyPath) {
    return this.keymap[keyPath]
  }

  createKeymapFile () {
    fs.closeSync(fs.openSync(this.keymapFile, 'w'))
    fs.writeFileSync(this.keymapFile, JSON.stringify(keymapDefaults, null, 2))
    this.keymap = JSON.parse(fs.readFileSync(this.keymapFile))
  }
}
