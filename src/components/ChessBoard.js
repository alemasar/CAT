/* eslint-disable */
/*

  <style>
    .chess-board_container{
      background-color:#000;
      width:300px;
      height:300px;
    }
    </style>
<template>
  <div class="chess-board_container">
  </div>
</template>
*/
class ChessBoard extends HTMLElement {
  constructor() {
    super();
    console.log("PASSSOOOO")
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('chess-board', ChessBoard);
