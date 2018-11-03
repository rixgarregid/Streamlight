const StreamlightWindow = require('./streamlight-window')
const Config = require('../config')
const KeymapManager = require('../keymap-manager')
const AutoLaunch = require('auto-launch')
const { EventEmitter } = require('events')
const { app, globalShortcut, Tray, ipcMain, Menu, nativeImage } = require('electron')
const path = require('path')
const fs = require('fs')

module.exports =
class StreamlightApplication extends EventEmitter {
   static open (options) {
     if (StreamlightApplication.isSecondInstance()) app.quit()
     global.streamlight = new StreamlightApplication(options).initialize()
  }

  constructor (options) {
    super()

    this.version = app.getVersion()
    this.developmentMode = options.developmentMode
    this.streamlightWindow = new StreamlightWindow(options)
    this.config = new Config()
    this.keymap = new KeymapManager()

    if (this.config.get('autorun') && !this.developmentMode) {
      this.autoLaunch = new AutoLaunch({ name: 'Streamlight' })
      this.autoLaunch.enable()
    }

    this.tray = new Tray(nativeImage.createFromPath(path.resolve('./resources/icons/icon.png')))
    this.tray.setToolTip('Streamlight')
    this.tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Streamlight Search',
        icon: nativeImage.createFromPath(path.resolve('./resources/icons/tray-icon.png')),
        accelerator: this.keymap.get('toggle'),
        click: () => this.emit('window:toggle')
      },
      {
        type: 'separator'
      },
      {
        label: 'Restore Streamlight position',
        accelerator: this.keymap.get('center'),
        click: () => this.emit('window:center')
      },
      {
        label: 'Reload Streamlight',
        accelerator: this.keymap.get('reload'),
        click: () => this.emit('application:reload')
      },
      {
        label: 'Quit Streamlight',
        click: () => this.emit('application:quit')
      }
    ]))
  }

  initialize () {
    this.attachEvents()

    globalShortcut.register(this.keymap.get('toggle'), () => this.emit('window:toggle'))
    globalShortcut.register(this.keymap.get('center'), () => this.emit('window:center'))
    globalShortcut.register(this.keymap.get('reload'), () => this.emit('application:reload'))
    globalShortcut.register('CmdOrCtrl+Shift+I', () => this.emit('window:toggle-dev-tools'))

    ipcMain.on('application:quit', () => this.emit('application:quit'))
    ipcMain.on('application:reload', () => this.emit('application:reload'))
    ipcMain.on('application:reset', () => this.emit('application:reset'))
    ipcMain.on('application:enable-auto-launch', () => this.emit('application:enable-auto-launch'))
    ipcMain.on('application:disable-auto-launch', () => this.emit('application:disable-auto-launch'))
    ipcMain.on('window:show', () => this.emit('window:show'))
    ipcMain.on('window:hide', () => this.emit('window:hide'))
  }

  attachEvents () {
    this.on('application:reload', () => { app.relaunch(); app.exit(0) })
    this.on('application:quit', () => app.quit())
    this.on('application:enable-auto-launch', () => this.autoLaunch.enable())
    this.on('application:disable-auto-launch', () => this.autoLaunch.disable())
    this.on('window:show', () => this.streamlightWindow.show())
    this.on('window:hide', () => this.streamlightWindow.hide())
    this.on('window:toggle', () => this.streamlightWindow.browserWindow.isVisible() ? this.streamlightWindow.hide() : this.streamlightWindow.show())
    this.on('window:center', () => this.streamlightWindow.browserWindow.center())
    this.on('window:toggle-dev-tools', () => this.streamlightWindow.browserWindow.webContents.toggleDevTools())
  }

  static isSecondInstance () {
    const quit = app.makeSingleInstance(() => {
      if (this.streamlightWindow) {
        if (this.streamlightWindow.isMinimized()) this.streamlightWindow.restore()
        this.streamlightWindow.focus()
      }
    })
    return quit
  }

  getVersion () {
    return this.version
  }

  quit () {
    this.emit('application:quit')
  }

  reload () {
    this.emit('application:reload')
  }

  enableAutoLaunch () {
    this.emit('application:enable-auto-launch')
  }

  disableAutoLaunch () {
    this.emit('application:disable-auto-launch')
  }
}
