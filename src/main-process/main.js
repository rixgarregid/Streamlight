const parseCommandLine = require('./parse-command-line')
const { app } = require('electron')

const args = parseCommandLine(process.argv.slice(1))

if (args.developmentMode) require('electron-reload')(__dirname)

app.on('ready', () => {
  StreamlightApplication = require('./streamlight-application')
  StreamlightApplication.open(args)
})
