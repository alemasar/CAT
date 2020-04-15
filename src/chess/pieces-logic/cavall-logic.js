import PieceLogic from "./piece-logic";

export default class CavallLogic extends PieceLogic {
  constructor(x, y, direction) {
    super(x, y, direction);
    this.moves = [
      [-1, -2], [-2, -1], [1, -2], [-2, 1],
      [2, -1], [-1, 2], [2, 1], [1, 2]
    ]

  }
  setPosiblesMovements(chessboard, x, y) {
    //console.log(this.moves);
    const posiblesMoves = [];
    this.moves.forEach(m => {
      let xto = parseInt(x) + (m[0] * this.direction);
      let yto = parseInt(y) + (m[1] * this.direction);
      //console.log(xto + "  " +yto);
      if (this.notOutOfBounds(xto, yto)){
        if((chessboard[xto][yto].piece !== 0 && chessboard[xto][yto].pieceLogic.direction !== this.direction) || chessboard[xto][yto].piece === 0) {
          posiblesMoves.push([xto, yto]);
        }
      } 
    })
    //console.log(this.posiblesMoves);
    return posiblesMoves;
  }
}
