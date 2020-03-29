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
      [{ piece: 2 }, { piece: 3 }, { piece: 4 }, { piece: 6 }, { piece: 5 }, { piece: 4 }, { piece: 3 }, { piece: 2 }],
      [{ piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }],
      [{ piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }],
      [{ piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }],
      [{ piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }],
      [{ piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }, { piece: 0 }],
      [{ piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }, { piece: 1 }],
      [{ piece: 2 }, { piece: 3 }, { piece: 4 }, { piece: 6 }, { piece: 5 }, { piece: 4 }, { piece: 3 }, { piece: 2 }]
    ];
    this.setPositions();
    chessboard.add(this.chessboard_pieces);
    console.log(chessboard.getAll());
  }

  setPositions() {
    const init_pos_top = 480;
    const init_pos_left = 60;
    const width_piece = 60;
    const height_piece = 60;
    this.chessboard_pieces.forEach((x, ix) => {
      const top = init_pos_top - (ix * height_piece);
      x.forEach((y, iy) => {
        const left = init_pos_left + (iy * width_piece);
        this.chessboard_pieces[ix][iy].top = top;
        this.chessboard_pieces[ix][iy].left = left;
      })
    })
  }
}