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
    console.log("NEW GAME LOGIC");
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
      const columna = kingChessboard[x];
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
   // console.log("KING POSITION: " + kingX + "  " + kingY);
    return {
      kingX,
      kingY,
      kingFound
    }
  }
  searchKillerPieces(virtualChessboard, king, inix, iniy, fix, fiy, kingColor){
    let initPiece = {};
    let fiPiece = {};
    let posiblesMoves = [];
    let x = 0;
    let y = 0;
    const killerPieces = [];
    if (king.kingFound){
      initPiece = virtualChessboard[inix][iniy];
      fiPiece = virtualChessboard[fix][fiy];
      virtualChessboard[fix][fiy] = initPiece;
      virtualChessboard[inix][iniy] = fiPiece;
      while (x < virtualChessboard.length) {
        while (y < virtualChessboard[x].length) {
          const columna = virtualChessboard[x][y];

          if (columna.piece !== 0 && columna.pieceLogic.direction !== kingColor) {
            posiblesMoves = columna.pieceLogic.setPosiblesMovements(virtualChessboard, x, y);
            if (posiblesMoves.length > 0) {
              posiblesMoves.forEach(pm => {
                if (columna.piece===4){
                  console.log("pm x: "+pm[0]+" pm y: "+pm[1]+" king.kingX "+king.kingX+" king.kingY "+king.kingY)
                }
                if (pm[0] === king.kingX && pm[1] === king.kingY) {
                  killerPieces.push(columna);
                  //jaqueMate = true;
                }
              })
              if (killerPieces.length > 0){
                columna.pieceLogic.posiblesMoves = posiblesMoves;
              }
              //columna[y].pieceLogic.posiblesMoves=[];
            }
          }
          y++;
        }
        y = 0;
        x++;
      }
    }
    return killerPieces;
  }
  copyChessBoard(){
    let virtualChessboard = [];
    this.chessboard_pieces.forEach((fila, xfila) => {
      virtualChessboard[xfila]=[];
      fila.forEach((columna) =>{
        virtualChessboard[xfila].push({
          piece: columna.piece,
          pieceLogic: Object.assign(Object.create(Object.getPrototypeOf(columna.pieceLogic)), columna.pieceLogic)
          //boxComponent: Object.assign({}, columna.boxComponent)
        });
      })
    });
    return virtualChessboard;
  }
  checkPosibleKingDeath(inix, iniy, fix, fiy, turn) {

    let posibleKingDeath = false;
    let king = {};
    let killerPieces = [];
    const kingColor = parseInt(turn);
    const virtualChessboard = this.copyChessBoard();
    console.log("checkPosibleKingDeath");
    /*virtualChessboard[0][0].pieceLogic.posiblesMoves = 0;
    console.log(virtualChessboard[0][0].pieceLogic.posiblesMoves);
    console.log(this.chessboard_pieces[0][0].pieceLogic.posiblesMoves);*/
    king = this.searchKing(virtualChessboard, kingColor);
    killerPieces = this.searchKillerPieces(virtualChessboard, king, inix, iniy, fix, fiy, kingColor);
    if (killerPieces.length > 0){
      posibleKingDeath = true;
    }
    return posibleKingDeath;
  }

  checkJaqueMate(inix, iniy, fix, fiy, turn){
    let jaqueMate = false;
    let killerPieces = [];
    let canMove = true;
    let initPiece = {};
    let fiPiece = {};
    const kingColor = parseInt(turn);
    const virtualChessboard = this.copyChessBoard();
    const king = this.searchKing(virtualChessboard, kingColor);
    const posiblesMoves = virtualChessboard[king.kingX][king.kingY].pieceLogic.setPosiblesMovements(virtualChessboard, king.kingX, king.kingY);
    initPiece = virtualChessboard[inix][iniy];
    fiPiece = virtualChessboard[fix][fiy];
    virtualChessboard[fix][fiy] = initPiece;
    virtualChessboard[inix][iniy] = fiPiece;
    posiblesMoves.forEach(pm => {
      console.log(pm)
      killerPieces = this.searchKillerPieces(virtualChessboard, king, king.kingX, king.kingY, pm[0], pm[1], kingColor);
      console.log("KILLER PIECES", killerPieces);
      if (killerPieces.length > 0 && canMove) {
        canMove = false;
      }
    })
/*
    if (killerPieces.length > 1) {
      console.log("KING POSITION: " + king.kingX + "  " + king.kingY);
    } else if (killerPieces.length === 1) {
      console.log("KING POSITION: ", virtualChessboard[king.kingX][king.kingY]);

    }*/

    return jaqueMate;
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