import PieceLogic from "./piece-logic";

export default class TorreLogic extends PieceLogic{
  constructor(x, y,top, left){
    super();
    this.moves = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
   ]
   this.x = x;
   this.y = y;
   this.top = top;
   this.left = left;
  }
  checkMove(){

  }
}
