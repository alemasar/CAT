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
    /*global firebase:true*/
    /*eslint no-undef: "error"*/
    this.dbRef = firebase.firestore();
    this.idGame = 0;
    this.startPlayingConnection = {};
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
    this.chessboard_pieces.forEach((y) => {
      chessboard.add(y);
    });
    //    game.movementStatus = 0;
    game.set("movement-status", -1);
    game.set("player", 1);
    //game.add("movementStatus", 0);  
  }

  listAllGames() {
    return this.dbRef.collection("game");
  }

  createGame(gameData) {
    gameData.moves = [];
    console.log(gameData);
    const docRef = this.listAllGames().add(gameData);
    //this.idGame = docRef.id;
    console.log(this.idGame);
    return docRef;
  }

  getMovementStatus() {
    const docRef = this.listAllGames().doc(this.idGame).get();
    return docRef;
  }
  updateConfigGameData(gameData) {
    const docRef = this.listAllGames().doc(this.idGame).update({
      user: firebase.firestore.FieldValue.arrayUnion(gameData)
    });
    return docRef;
  }

  setMovement(player, inix, iniy, fix, fiy) {
    const move = {
      player,
      inix,
      iniy,
      fix,
      fiy
    }
    const docRef = this.listAllGames().doc(this.idGame).update({
      moves: firebase.firestore.FieldValue.arrayUnion(move)
    });
    return docRef;
  }

  searchKing(kingChessboard, color){
    let x = 0;
    let y = 0;
    let kingX = 0;
    let kingY = 0;
    let kingFound = false;
    while (!kingFound && x < kingChessboard.length) {
      const columna = [...kingChessboard[x]];
      while (!kingFound && y < columna.length) {
        if (columna[y].piece === 5 && columna[y].pieceLogic.direction === color) {
          kingFound = true;
          kingX = x;
          kingY = y;
        }
        y++;
      }
      y = 0;
      x++;
    }
    console.log("KING POSITION: " + kingX + "  " + kingY);
    return {
      kingX,
      kingY,
      kingFound
    }
  }

  checkPosibleKingDeath(inix, iniy, fix, fiy, turn) {
    let initPiece = {};
    let fiPiece = {};
    let posiblesMoves = [];
    let virtualChessboard = [];
    let posibleKingDeath = false;
    let x = 0;
    let y = 0;
    const kingColor = parseInt(turn);
    this.chessboard_pieces.forEach((fila) => {
      virtualChessboard.push([...fila])
    });
    //console.log(virtualChessboard);
    const king = this.searchKing(virtualChessboard, kingColor);

    console.log("KING POSITION: " + king.kingX + "  " + king.kingY);
    if (king.kingFound){
      initPiece = virtualChessboard[inix][iniy];
      fiPiece = virtualChessboard[fix][fiy];
      virtualChessboard[fix][fiy] = initPiece;
      virtualChessboard[inix][iniy] = fiPiece;
      console.log(virtualChessboard);
      console.log("Initial X: " + inix + " Initial Y: " + iniy + " Fin X: " + fix + " Final Y: " + fiy);
      while (x < virtualChessboard.length) {
        const columna = [...virtualChessboard[x]];
        while (y < columna.length) {
          if (columna[y].piece !== 0 && columna[y].pieceLogic.direction !== kingColor) {
            posiblesMoves = columna[y].pieceLogic.setPosiblesMovements(virtualChessboard, x, y);
            if (posiblesMoves.length > 0) {
              posiblesMoves.forEach(pm => {
                if (pm[0] === king.kingX && pm[1] === king.kingY) {
                  console.log("KING POSITION: "+king.kingX+"  "+king.kingY+", Piece: "+columna[y].piece+", x: "+pm[0]+", y: "+pm[1]);
                  posibleKingDeath = true;
                }
              })
              //columna[y].pieceLogic.posiblesMoves=[];
            }
          }
          y++;
        }
        y = 0;
        x++;
      }
    }
    //const piecesColor = parseInt(turn);
    //const versusPiecesColor = parseInt(turn) * -1;
    //virtualChessboard[fix][fiy] = virtualChessboard[inix][iniy];
    //virtualChessboard*/
    return posibleKingDeath;
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
      })
    })
  }
}