import chessboard from "./game-instance";
/*
  1: PEO
  2: TORRE
  3: CAVALL
  4: ALFIL
  5: REINA
  6: REI

*/
export default class GameLogic {
  constructor() {
    this.chessboard_pieces = [
      [{ piece: 2 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 2 }],
      [{ piece: 3 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 3 }],
      [{ piece: 4 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 4 }],
      [{ piece: 6 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 6 }],
      [{ piece: 5 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 5 }],
      [{ piece: 4 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 4 }],
      [{ piece: 3 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 3 }],
      [{ piece: 2 }, { piece: 1 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 1 }, { piece: 2 }]
    ];
    this.setPositions();
    chessboard.add(this.chessboard_pieces);
  }

  checkFrontOfPiece(x, y, desx, desy) {
    let checkBox = false;
    console.log(this.chessboard_pieces[parseInt(x) + parseInt(desx)][parseInt(y) + parseInt(desy)])
    if (this.chessboard_pieces[parseInt(x) + parseInt(desx)][parseInt(y) + parseInt(desy)].piece !== 0) {
      checkBox = true;
    }
    return checkBox;
  }

  checkMove(x, y, direction) {
    const piece = this.chessboard_pieces[x][y].piece;
    let canMove = false;
    switch (piece) {
      default:
        if (!this.checkFrontOfPiece(x, y, 0, 1 * direction)) {
          canMove = true;
        }
    }
    return canMove;
  }
  setPositions() {
    const init_pos_top = 480;
    const init_pos_left = 60;
    const width_piece = 60;
    const height_piece = 60;
    this.chessboard_pieces.forEach((x, ix) => {
      const left = init_pos_left + (ix * width_piece);
      x.forEach((y, iy) => {
        const top = init_pos_top - (iy * height_piece);
        this.chessboard_pieces[ix][iy].top = top;
        this.chessboard_pieces[ix][iy].left = left;
      })
    })
  }
}