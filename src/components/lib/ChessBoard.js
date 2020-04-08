import chessboard from "CHESSLOGIC/chessboard-instance";
import game from "CHESSLOGIC/game-instance";
import ChessLogic from "CHESSLOGIC/game-logic";

const template = document.createElement("template");
      template.innerHTML =`<style>
      :host {
  display: flex;
  justify-content: center; }

.list-of-games {
  width: 200px;
  display: flex;
  flex-direction: column; }

.chess-board_container {
  background-image: url('src/img/chess-board.svg');
  background-size: 600px 600px;
  width: 600px;
  height: 600px;
  position: relative; }

      </style>
      
    <div class="list-of-games"></div>
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
    this.createSubcribe = {};
    this.idGame = 0;
    this.inix = 0;
    this.iniy = 0;
    this.fix = 0;
    this.fiy = 0;
    this.player = game.get("player");
    this.chessboard = chessboard.getAll();
    this.contLoadedBoxes = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.locateBoxes();
    this.initGame();
    this.listAllGames();
  }
  initGame(){
    document.getElementById("initPartida").addEventListener("click", ()=>{
      /*console.log(document.getElementById("idPartida").value);
      this.idGame = document.getElementById("idPartida").value;*/
      const val = document.getElementById("idPartida").value;
      if (val === ""){
        this.shadowRoot.querySelector(".list-of-games").style.display="flex";
        this.chessLogic.initGame();
        this.listAllGames();
      }else{
        this.chessLogic.idGame = val;
        this.createSubcribe();
        this.shadowRoot.querySelector(".list-of-games").style.display="none";
      }
    });
  }
  listAllGames(){
    const ref = this.chessLogic.listAllGames();
    this.createSubcribe = ref.onSnapshot(async ()=>{
      const data = await ref.get();
      this.shadowRoot.querySelector(".list-of-games").innerHTML = "";
      data.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const link = document.createElement("A");
        link.setAttribute("href","#");
        link.innerHTML=doc.id;
        this.shadowRoot.querySelector(".list-of-games").appendChild(link);
        link.addEventListener("click", (e) =>{
          e.preventDefault();
          document.getElementById("idPartida").value = doc.id;
        })
      });
    })
    /*const data = await this.chessLogic.listAllGames();
    console.log(data);
    data.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const link = document.createElement("A");
      link.setAttribute("href","#");
      link.innerHTML=doc.id;
      this.shadowRoot.querySelector(".list-of-games").appendChild(link);
      link.addEventListener("click", (e) =>{
        e.preventDefault();
        document.getElementById("idPartida").value = doc.id;
      })
    });*/

  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(newValue)
    if (name === "movement-status" && newValue !== 0) {
      //this.setAttribute(name, newValue)
      console.log(this.chessboard[this.inix][this.iniy]);
      if (this.chessboard[this.inix][this.iniy].piece !== 0 && newValue === "1") {
        if (this.chessboard[this.inix][this.iniy].pieceLogic.direction === this.player) {
          console.log("MISMO JUGADOR")
          this.setAttribute("movement-status", 2)
        } else {
          console.log("DIFERENTE JUGADOR")
          this.setAttribute("movement-status", 0)
        }
      } else if (newValue === "2") {
        const logic = this.chessboard[this.inix][this.iniy].pieceLogic;
        console.log(this.inix + "  " + this.iniy);
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
          console.log(this.fix);
          const piece = this.chessboard[this.inix][this.iniy].boxComponent.shadowRoot.querySelector(".chess-box *");
          const logic = this.chessboard[this.inix][this.iniy].pieceLogic;
          console.log(piece)
          if (this.chessboard[this.fix][this.fiy].piece !== 0) {
            const killpiece = this.chessboard[this.fix][this.fiy].boxComponent.shadowRoot.querySelector(".chess-box *");
            killpiece.parentNode.removeChild(killpiece);
          }
          this.chessboard[this.fix][this.fiy].boxComponent.shadowRoot.querySelector(".chess-box").appendChild(piece);
          this.chessboard[this.fix][this.fiy].pieceLogic = this.chessboard[this.inix][this.iniy].pieceLogic;
          this.chessboard[this.fix][this.fiy].piece = this.chessboard[this.inix][this.iniy].piece;
          console.log(this.chessboard[this.fix][this.fiy])
          logic.posiblesMoves.forEach(pm => {
            this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
          });
          logic.posiblesMoves.splice(0, logic.posiblesMoves.length)
          this.chessboard[this.inix][this.iniy].boxComponent.unselectBox();
          this.chessboard[this.inix][this.iniy].pieceLogic = {};
          this.chessboard[this.inix][this.iniy].piece = 0;
          console.log(this.chessboard);
          /*const movement = () => {
            this.setAttribute("movement-status", 0);
            this.player = this.player * -1;
            game.set("player", this.player);
          }*/
          //this.chessLogic.setMovement(this.player, this.fix, this.fiy, movement, this.idGame);
        } else {
          if (this.chessboard[this.fix][this.fiy].piece !== 0 && this.chessboard[this.fix][this.fiy].pieceLogic.direction === this.chessboard[this.inix][this.iniy].pieceLogic.direction) {
            console.log(this.chessboard);
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
              this.setAttribute("movement-status", 0)
            }
          } else {
            const inilogic = this.chessboard[this.inix][this.iniy].pieceLogic;
            this.chessboard[this.inix][this.iniy].boxComponent.unselectBox();
            inilogic.posiblesMoves.forEach(pm => {
              this.chessboard[pm[0]][pm[1]].boxComponent.unsetPosibleMovementBox();
            });
            this.setAttribute("movement-status", 0)
          }
        }
      }
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

