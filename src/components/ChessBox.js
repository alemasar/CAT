<style>
  :host{
    display:flex;
    justify-content:center;
    position:absolute;
  }
  .chess-box{
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-box">
    </div>
</template>

class ChessBox extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.loaded = new Promise((resolve)=>{
      this.connectedCallback = resolve;
    });
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
    console.log("CLICK BOX", this.x);
    this.dispatchEvent(new CustomEvent("box-clicked", {
      "detail": {"x":this.x,"y":this.y }
    }));
    /*
    boxDiv.style.border = "1px solid #ff0000";
    boxDiv.style.width = boxDiv.offsetWidth - 2 + "px";
    boxDiv.style.height = boxDiv.offsetHeight - 2 + "px";
    this.style.left = this.offsetLeft - 1 + "px";
    this.style.top = this.offsetTop - 1 + "px";*/
  }
  get x() {
    return this.getAttribute('x');
  }
  get y() {
    return this.getAttribute('y');
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