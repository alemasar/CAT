import SingletonObject from "CATSRC/classes/SingletonObject";
/*const handler = {
  get: (obj, prop) => {
    console.log("hola");
    
    return obj[prop];
  },
  set: (obj, prop, value) => {
    console.log(obj);
    obj.set(prop, value);
    return true;
  }
};*/
const game = new SingletonObject();
Object.freeze(game);

export default game;