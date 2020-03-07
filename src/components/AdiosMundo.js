class AdiosMundo extends HTMLElement {
  constructor() {
    super();
    this.textContent = 'Adios mundo!!!'
  }
}
customElements.define('adios-mundo', AdiosMundo);
