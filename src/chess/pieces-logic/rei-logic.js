import PieceLogic from "./piece-logic";

export default class ReiLogic extends PieceLogic {
  constructor(x, y, top, left) {
    super();
    this.moves = [
      [1, 1], [1, -1], [-1, 1], [-1, -1],
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ]
    this.x = x;
    this.y = y;
    this.top = top;
    this.left = left;
  }
  checkMove() {

  }
}
