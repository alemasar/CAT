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
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.dispatchEvent(new Event("box-created", {bubbles: true, composed: true}));
    this.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
  }

  _onClick() {
    if (this.parent.getAttribute("movement-status") === "0"){
      this.parent.inix = this.x;
      this.parent.iniy = this.y;
      this.parent.setAttribute("movement-status", 1);
    } else if (this.parent.getAttribute("movement-status") === "2"){
      this.parent.fix = this.x;
      this.parent.fiy = this.y;
      this.parent.setAttribute("movement-status", 3);
    }
  }

  setPosibleMovementBox(){
    this.style.backgroundColor = "#ff0000";
    this.style.opacity = ".5";
  }
  unsetPosibleMovementBox(){
    this.style.backgroundColor = "transparent";
    this.style.opacity = "1";
  }
  selectBox(){
    this.style.backgroundColor = "#ffff00";
    this.style.opacity = ".5";
  }

  unselectBox(){
    this.style.backgroundColor = "transparent";
    this.style.opacity = "1";
  }
}
customElements.define("chess-box", ChessBox);
