class SingletonArray {
  constructor(){
    this._data = [];
  }

  add(item){
    this._data.push(item);
  }
  getAll(){
    return this._data;
  }
  get(id){
    return this._data.find(d => d.id === id);
  }
}

export default SingletonArray;