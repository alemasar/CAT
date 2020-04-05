import PieceLogic from "./piece-logic";

export default class AlfilLogic extends PieceLogic{
  constructor(x, y, direction){
    super(x, y, direction);
    this.moves = [
      [1, 1], [1, -1], [-1, 1], [-1, -1]
   ]
  }

}
