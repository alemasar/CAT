import PieceLogic from "./piece-logic";

export default class AlfilLogic extends PieceLogic{
  constructor(x, y,top, left){
    super();
    this.moves = [
      [1, 1], [1, -1], [-1, 1], [-1, -1]
   ]
   this.x = x;
   this.y = y;
   this.top = top;
   this.left = left;
  }
  checkMove(){

  }
}
