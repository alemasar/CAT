import chessboard from "CHESSLOGIC/chessboard-instance";

export default class PieceLogic {
  constructor(x, y, direction) {
    this.moves = [];
    this.posiblesMoves = [];
    this.chessboard = chessboard.getAll();
    this.killed = false;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  notOutOfBounds(x, y) {
    let notOut = false;
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      notOut = true;
    }
    return notOut;
  }
  checkMove(fix, fiy) {
    let move = false;
    this.posiblesMoves.forEach(pm => {
      if (pm[0] === fix && pm[1] === fiy) {
        move = true;
      }
    });
    return move;
  }
  setPosiblesMovements(chessboard, x, y) {
    //console.log(this.moves);
    const posiblesMoves = [];
    this.moves.forEach(m =>{
      let xto = parseInt(x) + (m[0] * this.direction);
      let yto = parseInt(y) + (m[1] * this.direction);
      while (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece === 0){
        posiblesMoves.push([xto, yto]);
        xto = parseInt(xto) + (m[0] * this.direction);
        yto = parseInt(yto) + (m[1] * this.direction);
      }
      //console.log(xto + "  " +yto);
      if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece !== 0 && chessboard[xto][yto].pieceLogic.direction !== this.direction) {
        /*if (chessboard[x][y].piece===4){
          console.log("MOVIMENT PER MATAR: "+xto + "  " +yto);
        }*/
        posiblesMoves.push([xto, yto]);
      }
    })
    //console.log(this.posiblesMoves);
    return posiblesMoves;
  }
  checkKillKingMoves(chessboard, inix, iniy, fix, fiy, x, y) {
    console.log(chessboard);
    let initPiece = {};
    let fiPiece = {};
    const posiblesMoves = [];
    let killMoves = [];
    initPiece = chessboard[inix][iniy];
    fiPiece = chessboard[fix][fiy];
    chessboard[fix][fiy] = initPiece;
    chessboard[inix][iniy] = fiPiece;

    this.moves.forEach(m =>{
      let xto = parseInt(fix) + (m[0] * this.direction);
      let yto = parseInt(fiy) + (m[1] * this.direction);
      posiblesMoves.slice();
      while (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece === 0){
        posiblesMoves.push([xto, yto]);
        xto = parseInt(xto) + (m[0] * this.direction);
        yto = parseInt(yto) + (m[1] * this.direction);
      }
//      console.log("Xto: "+xto + " yto: " +yto+" King x: "+x+" king y: "+y);
      if (this.notOutOfBounds(xto, yto) && xto === x && yto === y) {
        /*if (chessboard[x][y].piece===4){
          console.log("MOVIMENT PER MATAR: "+xto + "  " +yto);
        }*/
        posiblesMoves.push([fix, fiy]);
        killMoves = [...posiblesMoves];
        console.log("MOVIMENT PER MATAR: ", killMoves);
      }
    })
    //console.log(this.posiblesMoves);
    return killMoves;
  }
}