import chessboard from "CHESSLOGIC/chessboard-instance";
import game from "CHESSLOGIC/game-instance";
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
      
    <game-list></game-list>
    <h1>TORN: <span class="user-turn"></span></h1>
    <div class="chess-board_container">
    </div>
  `;
class ChessBoard extends HTMLElement {
  static get observedAttributes() {
    return ["movement-status"];
  }
  constructor() {
    super();
    this.chessLogic = new ChessLogic();
    this.startPlayingConnection = {};
    this.inix = 0;
    this.iniy = 0;
    this.fix = 0;
    this.fiy = 0;
    this.player = game.get("player");
    this.turn = "1";
    this.chessboard = chessboard.getAll();
    this.contLoadedBoxes = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.locateBoxes();
    document.addEventListener("start-playing", () => {
      this.setAttribute("movement-status", 0);
      this.chessLogic.idGame = game.get("idGame");
      console.log("JUGADOR: ", this.player);
      this.player = game.get("player");
      game.set("turn", this.turn);
      this.startPlaying();
    });
/*    this.initGame();
    this.listAllGames();*/
  }
  startPlaying(){
    console.log(this.chessLogic.idGame);
    this.startPlayingConnection = this.chessLogic.listAllGames().doc(this.chessLogic.idGame).onSnapshot((doc)=>{
      const data = doc.data();

      if (data.moves.length>0){
        const move = data.moves.pop();
        console.log(typeof move.player+"    "+ typeof game.get("player"));
        if (move.player !== game.get("player")){
          console.log("entro")
          this.move(move.inix, move.iniy, move.fix, move.fiy, move.player);
          this.turn = parseInt(this.turn) * -1;
          this.turn = this.turn.toString()
          console.log("TURNO", this.turn);
          game.set("turn", this.turn);
        }
      }
      if (game.get("turn") === "-1"){
        this.shadowRoot.querySelector(".user-turn").innerHTML="NEGRES";
      } else {
        this.shadowRoot.querySelector(".user-turn").innerHTML="BLANQUES";
      }
    });
  }

  async move(inix, iniy, fix, fiy, turn){
    console.log(this.chessboard[inix][iniy].boxComponent.shadowRoot.querySelector(".chess-box *"));
    const piece = this.chessboard[inix][iniy].boxComponent.shadowRoot.querySelector(".chess-box *");
    const logic = this.chessboard[inix][iniy].pieceLogic;
    console.log(fix+" "+fiy+"  "+this.chessboard[fix][fiy])
    if (this.chessboard[fix][fiy].piece !== 0) {
      const killpiece = this.chessboard[fix][fiy].boxComponent.shadowRoot.querySelector(".chess-box *");
      killpiece.parentNode.removeChild(killpiece);
    }
    console.log(this.chessboard[fix][fiy].boxComponent.shadowRoot.querySelector(".chess-box"));
    console.log(piece);
    
    this.chessboard[fix][fiy].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
    this.chessboard[fix][fiy].pieceLogic = this.chessboard[inix][iniy].pieceLogic;
    this.chessboard[fix][fiy].piece = this.chessboard[inix][iniy].piece;
    logic.posiblesMoves.forEach(pm => {
      this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
    });
    logic.posiblesMoves.splice(0, logic.posiblesMoves.length)
    this.chessboard[inix][iniy].boxComponent.unselectBox();
    this.chessboard[inix][iniy].pieceLogic = {};
    this.chessboard[inix][iniy].piece = 0;
    await this.chessLogic.setMovement(turn, inix, iniy, fix, fiy);
    this.setAttribute("movement-status", 0);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    console.log("MISMO JUGADOR: "+this.chessboard[this.inix][this.iniy].piece+"  "+this.inix);
    if (name === "movement-status" && newValue !== -1 && this.player === this.turn) {
      if (newValue === "1") {
        if (this.chessboard[this.inix][this.iniy].pieceLogic.direction === parseInt(this.turn) && this.chessboard[this.inix][this.iniy].piece !== 0) {
          console.log("MISMO JUGADOR: "+this.chessboard[this.inix][this.iniy].pieceLogic.direction+", "+ parseInt(this.turn));
          this.setAttribute("movement-status", 2)
        } else {
          console.log("DIFERENTE JUGADOR")
          this.setAttribute("movement-status", 0)
        }
      } else if (newValue === "2") {
        const logic = this.chessboard[this.inix][this.iniy].pieceLogic;
        logic.setPosiblesMovements(this.inix, this.iniy);
        if (logic.posiblesMoves.length > 0) {
          this.chessboard[this.inix][this.iniy].boxComponent.selectBox();
          logic.posiblesMoves.forEach(pm => {
            this.chessboard[pm[0]][pm[1]].boxComponent.setPosibleMovementBox();
          })
        }
      } else if (newValue === "3") {
        console.log(this.fix + "  " + this.fiy);
        const move = this.chessboard[this.inix][this.iniy].pieceLogic.checkMove(this.fix, this.fiy);
        if (move) {
          this.move(this.inix, this.iniy, this.fix, this.fiy, this.turn);
          this.turn = parseInt(this.turn) * -1;
          this.turn = this.turn.toString()
          console.log("TURNO", this.turn);
          game.set("turn", this.turn);
        } else {
          if (this.chessboard[this.fix][this.fiy].piece !== 0 && this.chessboard[this.fix][this.fiy].pieceLogic.direction === this.chessboard[this.inix][this.iniy].pieceLogic.direction) {
            const inilogic = this.chessboard[this.inix][this.iniy].pieceLogic;
            const filogic = this.chessboard[this.fix][this.fiy].pieceLogic;
            this.chessboard[this.inix][this.iniy].boxComponent.unselectBox();
            inilogic.posiblesMoves.forEach(pm => {
              this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
            });
            filogic.setPosiblesMovements(this.fix, this.fiy);
            if (filogic.posiblesMoves.length > 0) {
              this.chessboard[this.fix][this.fiy].boxComponent.selectBox();
              filogic.posiblesMoves.forEach(pm => {
                this.chessboard[pm[0]][pm[1]].boxComponent.setPosibleMovementBox();
              })
            } else {
              const inilogic = this.chessboard[this.inix][this.iniy].pieceLogic;
              this.chessboard[this.inix][this.iniy].boxComponent.unselectBox();
              inilogic.posiblesMoves.forEach(pm => {
                this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
              });
              this.setAttribute("movement-status", 0);
            }
          } else {
            const inilogic = this.chessboard[this.inix][this.iniy].pieceLogic;
            this.chessboard[this.inix][this.iniy].boxComponent.unselectBox();
            inilogic.posiblesMoves.forEach(pm => {
              this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
            });
            this.setAttribute("movement-status", 0);
          }
        }
      }
    }
  }
  connectedCallback() {
    // this.addEventListener('click', this._onClick);
    this.setAttribute("movement-status", -1);
    this.chessboard.forEach((x, ix) => {
      x.forEach((y, iy) => {
        this.chessboard[ix][iy].boxComponent.parent = this;
      })
    })
  }
  disconnectedCallback() {
    this.startPlayingConnection();
  }
  locateBoxes() {
    const init_pos_top = 480;
    const init_pos_left = 60;
    const width_piece = 60;
    const height_piece = 60;

    console.log(this.chessboard)
    this.chessboard.forEach((x, ix) => {
      const left = init_pos_left + (ix * width_piece);
      x.forEach((y, iy) => {
        const top = init_pos_top - (iy * height_piece);
        const box = document.createElement("chess-box");
        box.style.top = top + "px";
        box.style.left = left + "px";
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
    this.chessboard.kingPosition = [];
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
            case 6:
              piece = document.createElement("chess-reina");
              break;
            case 5:
              this.chessboard.kingPosition.push({ direction, x, y })
              piece = document.createElement("chess-rei");
              break;
            default:
              piece = document.createElement("chess-peo");
          }
          piece.setAttribute("theme", theme);
          piece.setAttribute("direction", direction);
          this.chessboard[ix][iy].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
        }
        this.chessboard[ix][iy].boxComponent.x = ix;
        this.chessboard[ix][iy].boxComponent.y = iy;
      });
    });
  }
}
customElements.define('chess-board', ChessBoard);

