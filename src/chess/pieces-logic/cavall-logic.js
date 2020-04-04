import PieceLogic from "./piece-logic";

export default class CavallLogic extends PieceLogic{
  constructor(x, y,top, left){
    super();
    this.moves = [
      [-1, -2], [-2, -1], [1, -2], [-2, 1],
   ]
   this.x = x;
   this.y = y;
   this.top = top;
   this.left = left;
  }
  checkMove(){

  }
}
