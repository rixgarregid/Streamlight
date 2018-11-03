class InputToggleElement extends HTMLElement {
  constructor () {
    super()
    this.renderHTML()

    this.addEventListener('click', () => this.classList.toggle('active'))
  }

  renderHTML () {
    this.innerCircleElement = document.createElement('span')
    this.innerCircleElement.classList.add('inner-circle')
    this.appendChild(this.innerCircleElement)
  }
}

customElements.define('input-toggle', InputToggleElement)
