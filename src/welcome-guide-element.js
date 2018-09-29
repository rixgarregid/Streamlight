const lightThemeBtn = document.querySelector('.slider-btn .light-theme-btn')
const darkThemeBtn = document.querySelector('.slider-btn .dark-theme-btn')

const streamlightApp = document.querySelector('.streamlight-app')

const path = require('path')
const { ipcRenderer } = require('electron')
const Config = require('./config')
const config = new Config(path.resolve('./config.json'))

lightThemeBtn.addEventListener('click', () => {
    if (darkThemeBtn.classList.contains('active')) {
        darkThemeBtn.classList.remove('active')
        darkThemeBtn.style.color = '#000'
        lightThemeBtn.classList.add('active')
        streamlightApp.setAttribute('theme', 'light')
        config.set('theme', 'light')
    }
})

darkThemeBtn.addEventListener('click', () => {
    if (lightThemeBtn.classList.contains('active')) {
        lightThemeBtn.classList.remove('active')
        darkThemeBtn.classList.add('active')
        darkThemeBtn.style.color = '#fff'
        streamlightApp.setAttribute('theme', 'dark')
        config.set('theme', 'dark')
    }
})

const runOnStartupToggle = document.querySelector('.autorun-toggle')
runOnStartupToggle.addEventListener('click', () => {
    if (runOnStartupToggle.classList.contains('active')) {
        config.set('runOnSystemStartup', true)
        ipcRenderer.send('enable-auto-launch')
    } else {
        config.set('runOnSystemStartup', false)
        ipcRenderer.send('disable-auto-launch')
    }
})

const loadSettings = () => {
  if (config.get('theme') === 'light') {
    lightThemeBtn.classList.add('active')
  } else {
    darkThemeBtn.classList.add('active')
  }

  if (config.get('runOnSystemStartup')) {
    runOnStartupToggle.classList.add('active')
  }
}

loadSettings()
