const CommandPalette = require('./command-palette')
const { ipcRenderer, shell } = require('electron')

class StreamlightSearchElement extends HTMLElement {
  constructor () {
    super()

    this.renderHTML()
    this.attachDOMEvents()

    this.commandPalette = new CommandPalette()
    this.inputBox.focus()
  }

  searchResultsInDOM (lookFor) {
    for (let result of this.results) {
      if (result.innerText.toUpperCase().indexOf(lookFor) > -1) {
        result.classList.add('displayed')
      } else {
        result.classList.remove('displayed')
      }
    }
  }

  togglePlaceholderText () {
    if (this.inputBox.value) {
      this.inputPlaceholder.style.opacity = 0
    } else {
      this.inputPlaceholder.style.opacity = 1
    }
  }

  openSelectedResult () {
    for (let result of this.displayedResults) {
      if (result.classList.contains('selected')) {
        shell.openItem(result.getAttribute('path'))
      }
    }
  }

  updateSelectedResult (keyCode) {
    // Event: Down arrow key pressed.
    if (keyCode === 40) {
      if (this.displayedResults.length > 0) {
        for (let i = 0; i < this.displayedResults.length; i++) {
          if (this.displayedResults[i].classList.contains('selected')) {
            this.displayedResults[i].classList.remove('selected')
              if (i !== (this.displayedResults.length - 1)) {
                this.displayedResults[i + 1].classList.add('selected')
              } else {
                this.displayedResults[0].classList.add('selected')
              }
              break
          }
        }
      }
    }
    // Event: Up arrow key pressed.
    else if (keyCode === 38) {
      if (this.displayedResults.length > 0) {
        for (let i = 0; i < this.displayedResults.length; i++) {
          if (this.displayedResults[i].classList.contains('selected')) {
            this.displayedResults[i].classList.remove('selected')
              if (i !== 0) {
                this.displayedResults[i - 1].classList.add('selected')
              } else {
                this.displayedResults[this.displayedResults.length - 1].classList.add('selected')
              }
              break
          }
        }
      }
    }
  }

  attachDOMEvents () {
    this.inputBox.addEventListener('keydown', event => {
      this.togglePlaceholderText()

      switch (event.keyCode) {
        case 13: this.openSelectedResult(); break;                             // Event: Enter key pressed.
        case 27: ipcRenderer.send('window:hide'); break;                       // Event: Esc key pressed.
        case 38: this.updateSelectedResult(38); event.preventDefault(); break; // Event: Up arrow key pressed.
        case 40: this.updateSelectedResult(40); event.preventDefault(); break; // Event: Down arrow key pressed.
      }
    })

    this.inputBox.addEventListener('keyup', event => {
      this.togglePlaceholderText()

      this.results = document.getElementsByClassName('result')
      this.displayedResults = document.getElementsByClassName('displayed')
      this.streamlightResultsElement = document.querySelector('.streamlight-results')

      let lookingFor = this.inputBox.value.toUpperCase()

      this.commandPalette.lookForCommands(lookingFor.toLowerCase())
      this.searchResultsInDOM(lookingFor)

      if (lookingFor === '' || this.displayedResults.length < 1) {
        if (this.commandPalette.isCommand(lookingFor.toLowerCase())) return

        this.streamlightResultsElement.classList.remove('active')
        this.streamlightResultsElement.style.height = 0 + 'px'
        this.commandPalette.hideAllCommandElements()
      } else {
        this.streamlightResultsElement.classList.add('active')
        this.streamlightResultsElement.style.height = (20+30*this.displayedResults.length) + 'px'

        if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
          return
        } else {
          for (let result of this.displayedResults){
            if (result.classList.contains('selected')) result.classList.remove('selected')
          }
          this.displayedResults[0].classList.add('selected')
        }
      }
    })
  }

  renderHTML () {
    this.searchIcon = document.createElement('icon')
    this.searchIcon.classList.add('icon-search')

    this.inputBox = document.createElement('input')
    this.inputBox.setAttribute('type', 'text')
    this.inputBox.classList.add('input-box')

    this.inputPlaceholder = document.createElement('span')
    this.inputPlaceholder.classList.add('input-placeholder')
    this.inputPlaceholder.innerText = 'Streamlight Search'

    this.appendChild(this.searchIcon)
    this.appendChild(this.inputBox)
    this.appendChild(this.inputPlaceholder)
  }
}

customElements.define('streamlight-search', StreamlightSearchElement)
