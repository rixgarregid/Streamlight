const defaultCommands = require('./defaults/commands-default')
const path = require('path')
const fs = require('fs')
const { app } = require('electron').remote
const { ipcRenderer, remote } = require('electron')

module.exports =
class CommandPalette {
  constructor () {
    this.commandsPath = path.resolve('commands.json')
    this.commands = this.loadCommandsFromFile()
  }

  loadCommandsFromFile () {
    if (fs.existsSync(this.commandsPath)) {
      return JSON.parse(fs.readFileSync(this.commandsPath))
    } else {
      this.createCommandsFile(this.commandsPath)
      return JSON.parse(fs.readFileSync(this.commandsPath))
    }
  }

  isCommand (inputValue) {
    for (let command in this.commands) {
      if (inputValue === command) {
        return true
      }
    }
  }

  lookForCommands (inputValue) {
    for (let command in this.commands) {
      if (inputValue === command) {
        console.log(`Detected command: ${command}`)

        document.querySelector(`.${command}-command-result`).style.display = 'block'
        document.querySelector('.streamlight-results').classList.add('active')
        document.querySelector('.streamlight-results').style.height = `${this.commands[`${command}`].resultHeight}px`

        for (let displayedResult of document.querySelectorAll('.displayed')) {
          displayedResult.classList.remove('displayed')
        }
      }
    }
  }

  hideAllCommandElements () {
    if (document.querySelectorAll('.command-panel').length > 0) {
      for (let commandPanel of document.querySelectorAll('.command-panel')) {
        commandPanel.style.display = 'none'
      }
    }
  }

  run (command) {
    switch (command) {
      case 'application:quit': app.quit(); break
      case 'application:reload': app.relaunch(); app.quit(); break
      case 'application:reset': console.log('TODO: application:reset command'); break
      case 'window:center': remote.getCurrentWindow().center(); break
      case 'window:lock': document.querySelector('.icon-search').style.appRegion = 'no-drag'; break
      case 'window:unlock': document.querySelector('.icon-search').style.appRegion = 'drag'; break
      case 'google:search': console.log('TODO: google:search command'); break
      case 'devtools:toggle': remote.getCurrentWindow().webContents.toggleDevTools(); break
    }
  }

  createCommandsFile (path) {
    fs.closeSync(fs.openSync(path, 'w'))
    fs.writeFileSync(path, JSON.stringify(defaultCommands, null, 2))
  }
}
