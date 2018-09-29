const yargs = require('yargs')
const dedent = require('dedent')
const { app } = require('electron')

module.exports = parseCommandLine = args => {
  const developmentMode = args.some(val => val == '--development' || val == '-d')
  const foreground = args.some(val => val == '--foreground' || val == '-f')
  const windowLimits = args.some(val => val == '--window-limits' || val == '-wl')
  const reset = args.some(val => val == '--reset' || val == '-r')

  return {
    developmentMode,
    foreground,
    windowLimits,
    reset
  }
}
