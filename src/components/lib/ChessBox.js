
const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center;
  position: absolute; }

.chess-box {
  width: 60px;
  height: 60px; }

      </style>
      
    <div class="chess-box">
    </div>
`;
class ChessBox extends HTMLElement {

  constructor() {
    super();
    //this.game = game;
    this.x = 0;
    this.y = 0;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    /*this.shadowRoot.querySelector(".chess-peo").classList.add(this.theme);
    this.addEventListener('click', this._onClick);*/
    this.dispatchEvent(new Event('box-created', {bubbles: true, composed: true}));
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick() {
    //const boxDiv = this.shadowRoot.querySelector(".chess-box");
    console.log("CLICK BOX", this.parent);
    
    /*this.parent.setAttribute('x', this.x);
    this.parent.setAttribute('y', this.y);*/
    this.parent.x = this.x;
    this.parent.y = this.y;
    this.parent.setAttribute('movement-status', 1);
    /*this.dispatchEvent(new CustomEvent("box-clicked", {
      "detail": {"x":this.x,"y":this.y }
    }));*/
   // console.log(this.game)
    /*
    boxDiv.style.border = "1px solid #ff0000";
    boxDiv.style.width = boxDiv.offsetWidth - 2 + "px";
    boxDiv.style.height = boxDiv.offsetHeight - 2 + "px";
    this.style.left = this.offsetLeft - 1 + "px";
    this.style.top = this.offsetTop - 1 + "px";*/
  }

/*  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick(event) {
    const peoDiv = this.shadowRoot.querySelector(".chess-peo");
    console.log("CLICK PEO", event);
    
    peoDiv.style.border = "1px solid #ff0000";
    peoDiv.style.width = peoDiv.offsetWidth - 2 + "px";
    peoDiv.style.height = peoDiv.offsetHeight - 2 + "px";
    this.style.left = this.offsetLeft - 1 + "px";
    this.style.top = this.offsetTop - 1 + "px"; 
  }
  get theme() {
    return this.getAttribute('theme');
  }*/
}
customElements.define('chess-box', ChessBox);
