//import game from "CHESSLOGIC/game-instance";

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
    //this.game = game;
    this.x = 0;
    this.y = 0;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.dispatchEvent(new Event('box-created', {bubbles: true, composed: true}));
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick() {
    this.parent.x = this.x;
    this.parent.y = this.y;
    this.parent.setAttribute('movement-status', 1);
    this.style.border = "1px solid #000";
    this.style.width = this.offsetWidth - 2 + "px";
    this.style.height = this.offsetHeight - 2 + "px";
    this.style.left = this.offsetLeft - 1 + "px";
    this.style.top = this.offsetTop - 1 + "px";
  }
}
customElements.define('chess-box', ChessBox);
