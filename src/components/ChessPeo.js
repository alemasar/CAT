class ChessPeo extends HTMLElement {
  constructor() {
    super();
    console.log("PASSSO");
    this.textContent = 'Hola mundo!!!'
  }
}
customElements.define('chess-peo', ChessPeo);