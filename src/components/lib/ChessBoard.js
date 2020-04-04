import chessboard from "CHESSLOGIC/chessboard-instance";
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
  static get observedAttributes() {
    return ["movement-status"];
  }
  constructor() {
    super();
    new ChessLogic();
    this.x = 0;
    this.y = 0;
    this.chessboard = chessboard.getAll();
    this.contLoadedBoxes = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.locateBoxes();
  }
  attributeChangedCallback(name/*, oldValue, newValue*/) {
    console.log(name)
    if (name === "movement-status") {
      //this.setAttribute(name, newValue)
      console.log(this.x+"  "+this.y);
    }
  }
  connectedCallback() {
    // this.addEventListener('click', this._onClick);
    this.setAttribute("movement-status", 0);
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        this.chessboard[ix][iy].boxComponent.parent = this;
      })
    })
  }
  locateBoxes() {
    console.log(this.chessboard)
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        const box = document.createElement("chess-box");
        box.style.top = y.pieceLogic.top + "px";
        box.style.left = y.pieceLogic.left + "px";
        this.shadowRoot.querySelector(".chess-board_container").appendChild(box);
        this.chessboard[ix][iy].boxComponent = box;
        box.addEventListener("box-created", () => {
          this.contLoadedBoxes++;
          if (this.contLoadedBoxes === 64) {
            this.locatePieces();
          }
        })
      });
    });
    // console.log(game.movementStatus);
  }
  locatePieces() {
    let theme = "negra";
    let direction = -1;
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        if (iy < 2) {
          theme = "blanca";
          direction = 1;
        } else {
          theme = "negra";
          direction = -1;
        }
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
          piece.setAttribute("theme", theme);
          piece.setAttribute("direction", direction);
          this.chessboard[ix][iy].boxComponent.x = ix;
          this.chessboard[ix][iy].boxComponent.y = iy;
          this.chessboard[ix][iy].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
        }
      });
    });
  }
}
customElements.define('chess-board', ChessBoard);

