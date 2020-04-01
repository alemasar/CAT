
const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center;
  position: relative; }
  :host .negra {
    background-image: url('src/img/reina-negra.svg'); }
  :host .blanca {
    background-image: url('src/img/reina-blanc.svg'); }

.chess-reina {
  background-repeat: no-repeat;
  background-size: 60px 60px;
  width: 60px;
  height: 60px; }

      </style>
      
    <div class="chess-reina">
    </div>
`;
class ChessReina extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".chess-reina").classList.add(this.theme);
  }
  
  get theme() {
    return this.getAttribute('theme');
  }
}
customElements.define('chess-reina', ChessReina);
