
const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center;
  position: absolute; }

.chess-rei {
  background-image: url('src/img/rei-negra.svg');
  background-repeat: no-repeat;
  background-size: 60px 60px;
  width: 60px;
  height: 60px; }

      </style>
      
    <div class="chess-rei">
    </div>
`;
class ChessRei extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('chess-rei', ChessRei);
