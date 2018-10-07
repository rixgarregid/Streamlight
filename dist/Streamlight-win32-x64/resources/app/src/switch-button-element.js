class SwitchButtonElement extends HTMLElement {
  constructor () {
    super()
    this.renderHTML()
    this.classList.add('switch-btn')

    this.addEventListener('click', () => this.classList.toggle('active'))
  }

  renderHTML () {
    this.innerCircleElement = document.createElement('span')
    this.innerCircleElement.classList.add('inner-circle')
    this.appendChild(this.innerCircleElement)
  }
}

customElements.define('switch-btn', SwitchButtonElement)
