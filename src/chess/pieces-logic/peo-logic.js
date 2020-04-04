import PieceLogic from "./piece-logic";

export default class PeoLogic extends PieceLogic{
  constructor(x, y,top, left){
    super();
    this.moves = [
      [0, 1], [0, 2], [1, 1], [-1, 1]
   ]
   this.x = x;
   this.y = y;
   this.top = top;
   this.left = left;
  }
  checkMove(){

  }
}
