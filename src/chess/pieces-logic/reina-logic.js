import PieceLogic from "./piece-logic";

export default class ReinaLogic extends PieceLogic {
  constructor(x, y, direction){
    super(x, y, direction);
    this.moves = [
      [1, 1], [1, -1], [-1, 1], [-1, -1],
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ]
  }
  checkMove() {

  }
}
