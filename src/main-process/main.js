let startTime = Date.now()

const parseCommandLine = require('./parse-command-line')
const { app } = require('electron')

const args = parseCommandLine(process.argv.slice(1))

if (args.developmentMode) require('electron-reload')(__dirname)

app.on('ready', () => {
  args.readyTime = Date.now() - startTime

  StreamlightApplication = require('./streamlight-application')
  StreamlightApplication.open(args)
})
