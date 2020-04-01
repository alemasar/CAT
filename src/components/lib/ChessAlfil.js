
const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center;
  position: relative; }
  :host .negra {
    background-image: url('src/img/alfil-negra.svg'); }
  :host .blanca {
    background-image: url('src/img/alfil-blanc.svg'); }

.chess-alfil {
  background-repeat: no-repeat;
  background-size: 60px 60px;
  width: 60px;
  height: 60px; }

      </style>
      
    <div class="chess-alfil">
    </div>
`;
class ChessAlfil extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".chess-alfil").classList.add(this.theme);
  }
  
  get theme() {
    return this.getAttribute('theme');
  }
}
customElements.define('chess-alfil', ChessAlfil);
