import PieceLogic from "./piece-logic";

export default class ReiLogic extends PieceLogic {
  constructor(x, y, direction){
    super(x, y, direction);
    this.moves = [
      [1, 1], [1, -1], [-1, 1], [-1, -1],
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ]
  }
  setPosiblesMovements(x, y) {
    console.log("REI LOGIC");
    this.moves.forEach(m => {
      let xto = parseInt(x) + (m[0] * this.direction);
      let yto = parseInt(y) + (m[1] * this.direction);
      console.log(xto + "  " +yto);
      if (this.outOfBounds(xto, yto)){
        if((this.chessboard[xto][yto].piece !== 0 && this.chessboard[xto][yto].pieceLogic.direction !== this.direction) || this.chessboard[xto][yto].piece === 0) {
          this.posiblesMoves.push([xto, yto]);
        }
      } 
    })
    console.log(this.posiblesMoves);
  }
}
