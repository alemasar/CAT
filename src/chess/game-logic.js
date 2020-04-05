import chessboard from "./chessboard-instance";
import game from "./game-instance";
//import game from "./game-instance";
import PeoLogic from "./pieces-logic/peo-logic";
import TorreLogic from "./pieces-logic/torre-logic";
import CavallLogic from "./pieces-logic/cavall-logic";
import AlfilLogic from "./pieces-logic/alfil-logic";
import ReiLogic from "./pieces-logic/rei-logic";
import ReinaLogic from "./pieces-logic/reina-logic";

/*
  1: PEO
  2: TORRE
  3: CAVALL
  4: ALFIL
  5: REINA
  6: REI

*/
export default class GameLogic {
  constructor() {
    this.chessboard_pieces = [
      [{ piece: 2 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 2 }],
      [{ piece: 3 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 3 }],
      [{ piece: 4 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 4 }],
      [{ piece: 6 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 6 }],
      [{ piece: 5 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 5 }],
      [{ piece: 4 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 4 }],
      [{ piece: 3 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 3 }],
      [{ piece: 2 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 2 }]
    ];
    this.setPositions();
    this.chessboard_pieces.forEach((y)=>{
      chessboard.add(y);
    });
//    game.movementStatus = 0;
    game.set("movementStatus", 0);
    game.set("movementPlayer", 0);
    //game.add("movementStatus", 0);  
  }

  checkFrontOfPiece(x, y, desx, desy) {
    let checkBox = false;

    if (this.chessboard_pieces[parseInt(x) + parseInt(desx)][parseInt(y) + parseInt(desy)].piece !== 0) {
      checkBox = true;
    }
    return checkBox;
  }

  checkMove(/*x, y, direction*/) {
    //const piece = this.chessboard_pieces[x][y].piece;
    let canMove = false;
    /*switch (piece) {
      default:
        if (!this.checkFrontOfPiece(x, y, 0, 1 * direction, this.chessboard_pieces[parseInt(x) + parseInt(desx)][parseInt(y) + parseInt(desy)].piece)) {
          canMove = true;
        }
    }*/
    return canMove;
  }
  getPieceLogic(piece, x, y, direction) {
    let pieceLogic = {};
    switch (piece) {
      case 1:
        pieceLogic = new PeoLogic(x, y, direction);
        break;
      case 2:
        pieceLogic = new TorreLogic(x, y, direction);
        break;
      case 3:
        pieceLogic = new CavallLogic(x, y, direction);
        break;
      case 4:
        pieceLogic = new AlfilLogic(x, y, direction);
        break;
      case 5:
        pieceLogic = new ReiLogic(x, y, direction);
        break;
      case 6:
        pieceLogic = new ReinaLogic(x, y, direction);
        break;
    }
    return pieceLogic;
  }
  setPositions() {
    let direction = -1;
    this.chessboard_pieces.forEach((x, ix) => {
      x.forEach((y, iy) => {
        if (iy < 2) {
          direction = 1;
        } else {
          direction = -1;
        }
        const piece = this.getPieceLogic(y.piece, ix, iy, direction);
        this.chessboard_pieces[ix][iy].pieceLogic = piece;
        /*        this.chessboard_pieces[ix][iy].top = top;
                this.chessboard_pieces[ix][iy].left = left;*/
      })
    })
  }
}