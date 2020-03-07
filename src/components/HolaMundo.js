class HolaMundo extends HTMLElement {
  constructor() {
    super();
    this.textContent = 'Hola mundo!!!'
  }
}
customElements.define('hola-mundo', HolaMundo);