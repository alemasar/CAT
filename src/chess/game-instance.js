import SingletonObject from "CATSRC/classes/SingletonObject";

const game = new SingletonObject();
Object.freeze(game);

export default game;