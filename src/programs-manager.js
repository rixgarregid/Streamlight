const path = require('path')
const fs = require('fs')

module.exports =
class ProgramsManager {
  constructor () {
    this.programs = {}
    this.loadProgramsDB()
  }

  loadProgramsDB () {
    if (fs.existsSync(path.resolve('programs.json'))) {
      this.programs = JSON.parse(fs.readFileSync(path.resolve('programs.json')))
    } else {
      this.createProgramsDB()
    }
  }

  getProgramsDB () {
    return this.programs
  }

  add (name, programPath) {
    this.loadProgramsDB()

    this.programs[name] = programPath

    fs.writeFileSync(path.resolve('programs.json'), JSON.stringify(this.programs, null, 2))
  }

  createProgramsDB () {
    fs.closeSync(fs.openSync(path.resolve('programs.json'), 'w'))
    fs.writeFileSync(path.resolve('programs.json'), JSON.stringify(this.programs, null, 2))
    this.programs = JSON.parse(fs.readFileSync(path.resolve('programs.json')))
  }
}
