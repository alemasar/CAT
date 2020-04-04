class SingletonObject {
  constructor() {
    this._data = {};
  }

  set(key, value) {
    this._data[key] = value;
  }
  getAll() {
    return this._data;
  }
  get(key) {
    return this._data[key];
  }
}

export default SingletonObject;