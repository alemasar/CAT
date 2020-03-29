import Singleton from "CATSRC/classes/Singleton";

const chessboard = new Singleton();
Object.freeze(chessboard);

export default chessboard;