import PieceLogic from "./piece-logic";

export default class PeoLogic extends PieceLogic {
  constructor(x, y, direction) {
    super(x, y, direction);
    this.moves = [
      [0, 1], [0, 2], [1, 1], [-1, 1]
    ];
    this.moved = false;

  }
  setPosiblesMovements(chessboard, x, y) {
    const posiblesMoves = [];
    let xto = parseInt(x) + (this.moves[0][0] * this.direction);
    let yto = parseInt(y) + (this.moves[0][1] * this.direction);
    if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece === 0) {
      posiblesMoves.push([xto, yto]);
    }
    console.log(this.moved);
    if (this.moved === false && posiblesMoves.length > 0) {
      xto = parseInt(x) + (this.moves[1][0] * this.direction);
      yto = parseInt(y) + (this.moves[1][1] * this.direction);
      if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece === 0) {
        posiblesMoves.push([xto, yto]);
      }
      //this.moved = true;
    }
    
    xto = parseInt(x) + (this.moves[2][0] * this.direction);
    yto = parseInt(y) + (this.moves[2][1] * this.direction);
    if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece !== 0 && chessboard[xto][yto].pieceLogic.direction !== this.direction) {
      posiblesMoves.push([xto, yto]);
    }

    xto = parseInt(x) + (this.moves[3][0] * this.direction);
    yto = parseInt(y) + (this.moves[3][1] * this.direction);
    if (this.notOutOfBounds(xto, yto) && chessboard[xto][yto].piece !== 0 && chessboard[xto][yto].pieceLogic.direction !== this.direction) {
      posiblesMoves.push([xto, yto]);
    }
    //console.log(this.posiblesMoves);
    return posiblesMoves;
  }
}
