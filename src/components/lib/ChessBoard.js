import ChessLogic from "CHESSLOGIC/game-logic";

const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center; }

.chess-board_container {
  background-image: url('src/img/chess-board.svg');
  background-size: 600px 600px;
  width: 600px;
  height: 600px;
  position: relative; }

      </style>
      
    <div class="chess-board_container">
    </div>
  `;
class ChessBoard extends HTMLElement {
  constructor() {
    super();
    console.log("PASSSOOOO")
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const chesslogic = new ChessLogic();
    console.log(chesslogic);
    chesslogic.chessboard_pieces.forEach(x => {
      x.forEach(y => {
        if (y.piece !== 0) {
          let piece = {};
          switch (y.piece) {
            case 2:
              piece = document.createElement("chess-torre");
              break;
            case 3:
              piece = document.createElement("chess-cavall");
              break;
            case 4:
              piece = document.createElement("chess-alfil");
              break;
            case 5:
              piece = document.createElement("chess-reina");
              break;
            case 6:
              piece = document.createElement("chess-rei");
              break;
            default:
              piece = document.createElement("chess-peo");
          }       
          piece.style.top = y.top + "px";
          piece.style.left = y.left + "px";
          console.log(piece)
          this.shadowRoot.querySelector(".chess-board_container").appendChild(piece);
        }
      })
    })

  }
}
customElements.define('chess-board', ChessBoard);

