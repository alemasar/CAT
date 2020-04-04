import PieceLogic from "./piece-logic";

export default class VoidPieceLogic extends PieceLogic{
  constructor(x, y,top, left){
    super();
   this.x = x;
   this.y = y;
   this.top = top;
   this.left = left;
  }
  checkMove(){

  }
}