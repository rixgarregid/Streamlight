const defaultCommands = require('./default-command-palette')
const path = require('path')
const fs = require('fs')

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

  lookForCommands (inputValue) {
    for (let command in this.commands) {
      if (inputValue === `.${command}`) {
        document.querySelector(`.${command}-command-result`).style.display = 'block'
        document.querySelector('.streamlight-results').classList.add('active')
        document.querySelector('.streamlight-results').style.height = `${this.commands[`${command}`].resultHeight}px`

        for (let displayedResult of document.querySelectorAll('.displayed')) {
          displayedResult.classList.remove('displayed')
        }
      }
    }
  }

  isCommand (inputValue) {
    for (let command in this.commands) {
      if (inputValue === `.${command}`) {
        return true
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

  createCommandsFile (path) {
    fs.closeSync(fs.openSync(path, 'w'))
    fs.writeFileSync(path, JSON.stringify(defaultCommands, null, 2))
  }
}
