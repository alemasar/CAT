import SingletonArray from "./SingletonArray";

const instance = new SingletonArray();
Object.freeze(instance);

export default instance;
