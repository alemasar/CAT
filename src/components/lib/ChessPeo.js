const template = document.createElement("template");template.innerHTML =`<style></style>`;class ChessPeo extends HTMLElement {
  constructor() {
    super();
    console.log("PASSSO");
    this.textContent = 'Hola mundo!!!'
  }
}
customElements.define('chess-peo', ChessPeo);