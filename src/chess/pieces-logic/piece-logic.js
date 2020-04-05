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
  outOfBounds(x, y) {
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
  setPosiblesMovements(x, y) {
    console.log(this.moves);
    this.moves.forEach(m =>{
      let xto = parseInt(x) + (m[0] * this.direction);
      let yto = parseInt(y) + (m[1] * this.direction);
      while (this.outOfBounds(xto, yto) && this.chessboard[xto][yto].piece === 0){
        this.posiblesMoves.push([xto, yto]);
        xto = parseInt(xto) + (m[0] * this.direction);
        yto = parseInt(yto) + (m[1] * this.direction);
      }
      console.log(xto + "  " +yto);
      if (this.outOfBounds(xto, yto) && this.chessboard[xto][yto].piece !== 0 && this.chessboard[xto][yto].pieceLogic.direction !== this.direction) {
        this.posiblesMoves.push([xto, yto]);
      }
    })
    console.log(this.posiblesMoves);
  }
}