<style>
  :host{
    display:flex;
    justify-content:center;
    position:absolute;
  }
  .chess-cavall{
    background-image: image-url("cavall-negra.svg");
    background-repeat:no-repeat;
    background-size:60px 60px;
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-cavall">
    </div>
</template>

class ChessCavall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('chess-cavall', ChessCavall);