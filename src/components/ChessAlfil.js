<style>
  :host{
    display:flex;
    justify-content:center;
    position:relative;
    .negra{
      background-image: image-url("alfil-negra.svg");
    }
    .blanca{
      background-image: image-url("alfil-blanc.svg");
    }
  }
  .chess-alfil{
    background-repeat:no-repeat;
    background-size:60px 60px;
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-alfil">
    </div>
</template>

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