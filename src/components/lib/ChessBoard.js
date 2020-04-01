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
    this.chesslogic = new ChessLogic();
    this.contLoadedBoxes = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.locateBoxes();
    //this.locatePieces();
  }

  locateBoxes() {
    this.chesslogic.chessboard_pieces.forEach((x, ix) => {
      x.forEach((y, iy) => {
        const box = document.createElement("chess-box");
        box.style.top = y.top + "px";
        box.style.left = y.left + "px";
        box.setAttribute("x", ix);
        box.setAttribute("y", iy);
        box.addEventListener("box-clicked", (e)=> {
          const x = e.detail.x;
          const y = e.detail.y;
          console.log(x+'   '+y)
          if (this.chesslogic.chessboard_pieces[x][y].piece !==0){
            const piece=this.chesslogic.chessboard_pieces[x][y].boxComponent.shadowRoot.querySelector("chess-peo")
            const canMove = this.chesslogic.checkMove(x, y, piece.getAttribute("direction"));
console.log(x+"   "+y)
            if (canMove){
              console.log("CASELLA AMB FITXA", parseInt(y) + parseInt(piece.getAttribute("direction")));
              this.chesslogic.chessboard_pieces[x][parseInt(y) + parseInt(piece.getAttribute("direction"))].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
              this.chesslogic.chessboard_pieces[x][y].piece=0;
              this.chesslogic.chessboard_pieces[x][parseInt(y) + parseInt(piece.getAttribute("direction"))].piece=1;
            }
          }         
        });
        this.shadowRoot.querySelector(".chess-board_container").appendChild(box);
        this.chesslogic.chessboard_pieces[ix][iy].boxComponent = box;
        box.addEventListener("box-created", ()=>{
          this.contLoadedBoxes ++;
          if (this.contLoadedBoxes === 64){
            this.locatePieces();
          }
        })
      });
    });
  }
  locatePieces() {
    let theme = "negra";
    let direction = -1;
    this.chesslogic.chessboard_pieces.forEach((x, ix) => {
      x.forEach((y, iy) => {
        if (iy < 2) {
          theme = "blanca";
          direction = 1;
        }else{
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
          this.chesslogic.chessboard_pieces[ix][iy].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
        }
      });
    });
  }
}
customElements.define('chess-board', ChessBoard);

