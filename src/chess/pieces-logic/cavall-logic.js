import PieceLogic from "./piece-logic";

export default class CavallLogic extends PieceLogic{
  constructor(x, y, direction){
    super(x, y, direction);
    this.moves = [
      [-1, -2], [-2, -1], [1, -2], [-2, 1],
   ]

  }
  checkMove(){

  }
}
