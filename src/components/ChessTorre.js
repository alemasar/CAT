<style>
  :host{
    display:flex;
    justify-content:center;
    position:relative;
    .negra{
      background-image: image-url("torre-negra.svg");
    }
    .blanca{
      background-image: image-url("torre-blanc.svg");
    }
  }
  .chess-torre{
    background-repeat:no-repeat;
    background-size:60px 60px;
    width:60px;
    height:60px;
  }
</style>
<template>
    <div class="chess-torre">
    </div>
</template>

class ChessTorre extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".chess-torre").classList.add(this.theme);
  }
  
  get theme() {
    return this.getAttribute('theme');
  }
}
customElements.define('chess-torre', ChessTorre);