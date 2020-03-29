<style>
  :host{
    display:flex;
    justify-content:center;
    position:absolute;
  }
  .chess-rei{
    background-image: image-url("rei-negra.svg");
    background-repeat:no-repeat;
    background-size:60px 60px;
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-rei">
    </div>
</template>

class ChessRei extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('chess-rei', ChessRei);