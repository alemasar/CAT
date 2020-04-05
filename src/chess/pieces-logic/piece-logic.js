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
  setPosiblesMovements(/*x, y*/) {
    console.log(this.moves);
  }
}