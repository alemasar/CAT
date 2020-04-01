<style>
  :host{
    display:flex;
    justify-content:center;
    position:relative;
    .negra{
      background-image: image-url("peo-negra.svg");
    }
    .blanca{
      background-image: image-url("peo-blanc.svg");
    }
  }
  .chess-peo{
    background-repeat:no-repeat;
    background-size:60px 60px;
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-peo">
    </div>
</template>

class ChessPeo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".chess-peo").classList.add(this.theme);

  }
  get theme() {
    return this.getAttribute('theme');
  }
}
customElements.define('chess-peo', ChessPeo);