import PieceLogic from "./piece-logic";

export default class TorreLogic extends PieceLogic{
  constructor(x, y, direction){
    super(x, y, direction);
    this.moves = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
   ]
  }
  checkMove(){

  }
}
