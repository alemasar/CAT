/* eslint-disable */
import chessboard from "CHESSLOGIC/chessboard-instance";
//import game from "CHESSLOGIC/game-instance";
import ChessLogic from "CHESSLOGIC/game-logic";

<style>
  :host{
    display:flex;
    justify-content:center;
  }
  .chess-board_container{
    background-image: image-url("chess-board.svg");
    background-size:600px 600px;
    width:600px;
    height:600px;
    position:relative;
  }
</style>
  <template>
    <div class="chess-board_container">
    </div>
  </template>

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

  _onClick() {
    //const boxDiv = this.shadowRoot.querySelector(".chess-box");
    //console.log("CLICK BOX", this.movementStatus);
    //this.movementStatus = 1;
    this.setAttribute("movementStatus", 1);
    /*this.dispatchEvent(new CustomEvent("box-clicked", {
      "detail": {"x":this.x,"y":this.y }
    }));*/
    // console.log(this.game)
    /*
    boxDiv.style.border = "1px solid #ff0000";
    boxDiv.style.width = boxDiv.offsetWidth - 2 + "px";
    boxDiv.style.height = boxDiv.offsetHeight - 2 + "px";
    this.style.left = this.offsetLeft - 1 + "px";
    this.style.top = this.offsetTop - 1 + "px";*/
  }

  locateBoxes() {
    console.log(this.chessboard)
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        const box = document.createElement("chess-box");
        box.style.top = y.pieceLogic.top + "px";
        box.style.left = y.pieceLogic.left + "px";
        box.setAttribute("x", ix);
        box.setAttribute("y", iy);
        //box.setAttribute("movementStatus",0);
        /*        box.addEventListener("box-clicked", (e)=> {
                  const x = e.detail.x;
                  const y = e.detail.y;
                  console.log(x+'   '+y)
                  if (this.chessboard[x][y].piece !==0){
                    const piece=this.chessboard[x][y].boxComponent.shadowRoot.querySelector("chess-peo")
                    const canMove = this.chesslogic.checkMove(x, y, piece.getAttribute("direction"));
        console.log(x+"   "+y)
                    if (canMove){
                      console.log("CASELLA AMB FITXA", parseInt(y) + parseInt(piece.getAttribute("direction")));
                      this.chesslogic.chessboard_pieces[x][parseInt(y) + parseInt(piece.getAttribute("direction"))].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
                      this.chesslogic.chessboard_pieces[x][y].piece=0;
                      this.chesslogic.chessboard_pieces[x][parseInt(y) + parseInt(piece.getAttribute("direction"))].piece=1;
                    }
                  }         
                });*/
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
