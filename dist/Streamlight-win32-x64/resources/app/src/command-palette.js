const defaultCommands = require('./commands-default')
const path = require('path')
const fs = require('fs')
const { app } = require('electron').remote
const { remote, ipcRenderer } = require('electron')

const math = require('mathjs')

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

        if (command === '=') {
          command = 'ecalc'

          let expression = command.substring(1, command.length)
          console.log(expression)

          if (expression !== '') {
            document.querySelector(`.${command}-command-result`).style.display = 'block'
            document.querySelector('.streamlight-results').classList.add('active')
          } else {
            document.querySelector(`.${command}-command-result`).style.display = 'block'
            document.querySelector('.streamlight-results').classList.add('active')
          }
        }

        document.querySelector(`.${command}-command-result`).style.display = 'block'
        document.querySelector('.streamlight-results').classList.add('active')

        if (command === 'ecalc') command = '='
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
      case 'application:quit': app.quit(); break;
      case 'application:reload': ipcRenderer.send('application:reload'); break;
      case 'window:center': ipcRenderer.send('window:center'); break;
    }
  }

  createCommandsFile (path) {
    fs.closeSync(fs.openSync(path, 'w'))
    fs.writeFileSync(path, JSON.stringify(defaultCommands, null, 2))
  }
}
