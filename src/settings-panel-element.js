const Config = require('./config')
const { dialog } = require('electron').remote
const { ipcRenderer } = require('electron')
const path = require('path')

class SettingsPanelElement extends HTMLElement {
  constructor () {
    super()

    this.config = new Config()

    this.importDOMElements()
    this.loadSettingsToPanel()
    this.attachDOMEvents()
  }

  attachDOMEvents () {
    this.autorunToggle.addEventListener('click', () => {
      if (!this.autorunToggle.classList.contains('active')) {
        this.config.set('autorun', true)
        ipcRenderer.send('application:enable-auto-launch')
      } else {
        this.config.set('autorun', false)
        ipcRenderer.send('application:disable-auto-launch')
      }
    })

    // this.searchDirBtn.addEventListener('click', () => {
    //   dialog.showOpenDialog({ properties: ['openDirectory'] }, filePaths => {
    //     if (filePaths === 'undefined') {
    //       console.log('[searchDirBtn] No files were selected.')
    //     } else {
    //       this.searchDirLabel.innerText = filePaths[0]
    //       this.config.set('searchDirectory', this.searchDirLabel.innerText)
    //     }
    //   })
    // })

    // this.toggleShortcutInput.addEventListener('blur', () => {
    //   this.config.set('toggleStreamlightShortcut', this.toggleShortcutInput.value)
    // })

    this.saveWindowPositionBtn.addEventListener('click', () => {
      if (!this.saveWindowPositionBtn.classList.contains('active')) {
        this.config.set('saveWindowPosition', true)
      } else {
        this.config.set('saveWindowPosition', false)
      }
    })

    // this.autolangToggle.addEventListener('click', () => {
    //   if (!this.autolangToggle.classList.contains('active')) {
    //     this.config.set('autoLang', true)
    //   } else {
    //     this.config.set('autoLang', false)
    //   }
    // })

    this.lightThemeBtn.addEventListener('click', () => {
      if (this.darkThemeBtn.classList.contains('active')) {
        this.darkThemeBtn.classList.remove('active')
        this.darkThemeBtn.style.color = '#000'
        this.lightThemeBtn.classList.add('active')
        document.querySelector('.streamlight-app').setAttribute('theme', 'light')
        this.config.set('theme', 'light')
      }
    })

    this.darkThemeBtn.addEventListener('click', () => {
      if (this.lightThemeBtn.classList.contains('active')) {
        this.lightThemeBtn.classList.remove('active')
        this.darkThemeBtn.classList.add('active')
        this.darkThemeBtn.style.color = '#fff'
        document.querySelector('.streamlight-app').setAttribute('theme', 'dark')
        this.config.set('theme', 'dark')
      }
    })

    // this.englishLangBtn.addEventListener('click', () => {
    //   if (this.spanishLangBtn.classList.contains('active') || this.germanLangBtn.classList.contains('active')) {
    //     this.spanishLangBtn.classList.remove('active')
    //     this.germanLangBtn.classList.remove('active')
    //     this.englishLangBtn.classList.add('active')
    //     document.querySelector('.streamlight-app').setAttribute('lang', 'en')
    //     this.config.set('lang', 'en')
    //   }
    // })
    //
    // this.spanishLangBtn.addEventListener('click', () => {
    //   if (this.englishLangBtn.classList.contains('active') || this.germanLangBtn.classList.contains('active')) {
    //     this.englishLangBtn.classList.remove('active')
    //     this.germanLangBtn.classList.remove('active')
    //     this.spanishLangBtn.classList.add('active')
    //     document.querySelector('.streamlight-app').setAttribute('lang', 'es')
    //     this.config.set('lang', 'es')
    //   }
    // })
    //
    // this.germanLangBtn.addEventListener('click', () => {
    //   if (this.spanishLangBtn.classList.contains('active') || this.englishLangBtn.classList.contains('active')) {
    //     this.spanishLangBtn.classList.remove('active')
    //     this.englishLangBtn.classList.remove('active')
    //     this.germanLangBtn.classList.add('active')
    //     document.querySelector('.streamlight-app').setAttribute('lang', 'de')
    //     this.config.set('lang', 'de')
    //   }
    // })
  }

  updateSettingsPanel () {

  }

  loadSettingsToPanel () {
    if (this.config.get('autorun')) this.autorunToggle.classList.add('active')

    // this.searchDirLabel.innerText = this.config.get('searchDirectory')
    // this.toggleShortcutInput.value = this.config.get('toggleStreamlightShortcut')

    if (this.config.get('saveWindowPosition')) this.saveWindowPositionBtn.classList.add('active')

    if (this.config.get('autoLang')) {
      this.autolangToggle.classList.add('active')
      // this.langSliderBtn.classList.add('disabled')
    }

    if (this.config.get('theme') === 'light') {
      this.lightThemeBtn.classList.add('active')
    } else {
      this.darkThemeBtn.classList.add('active')
    }

    // if (this.config.get('lang') === 'en') {
    //   this.englishLangBtn.classList.add('active')
    // } else if (this.config.get('lang') === 'es') {
    //   this.spanishLangBtn.classList.add('active')
    // } else if (this.config.get('lang') === 'de') {
    //   this.germanLangBtn.classList.add('active')
    // }
  }

  importDOMElements () {
    this.autorunToggle = document.querySelector('.autorun-toggle-settings')
    // this.searchDirBtn = document.querySelector('.field.search-dir .search-dir-btn')
    // this.searchDirLabel = document.querySelector('.field.search-dir .selected-search-dir')
    // this.toggleShortcutInput = document.querySelector('.field.toggle-streamlight-shortcut input')
    this.saveWindowPositionBtn = document.querySelector('.save-window-position-toggle')
    this.autolangToggle = document.querySelector('.autolang-toggle')
    this.lightThemeBtn = document.querySelector('.field.theme-selection .light-theme-btn')
    this.darkThemeBtn = document.querySelector('.field.theme-selection .dark-theme-btn')
    // this.langSliderBtn = document.querySelector('.field.lang-selection .slider-btn')
    // this.englishLangBtn = document.querySelector('.field.lang-selection .english-lang-btn')
    // this.spanishLangBtn = document.querySelector('.field.lang-selection .spanish-lang-btn')
    // this.germanLangBtn = document.querySelector('.field.lang-selection .german-lang-btn')
  }
}

customElements.define('settings-panel', SettingsPanelElement)
