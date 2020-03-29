import Singleton from "./Singleton";

const instance = new Singleton();
Object.freeze(instance);

export default instance;
