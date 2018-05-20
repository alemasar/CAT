// import Utils from './utils';


export default class CatStore {
    constructor () {
        this.store = new Map();
    }

    /*
     *persistFunction () {
     *   let state;
     *   const funcGet = function (e) {
     *       console.log(this.target)
     *       this.target = this;
     *   }
     *   Utils.triggerEvent('get-element', { action: funcGet, target: state });
     *
     *   const func = function (e) {
     *       this.target = this.values;
     *       console.log(store);
     *   }
     *   Utils.triggerEvent('get-element', {
     *      action: func, target: store, values: state});
     *}
     */

    getStore () {

        const mh = {
            get: (dummyTarget, trapName) => {

                return Reflect[trapName];
            }
        }
        const dummy = new Map();
        const bh = new Proxy(dummy, mh);

        return new Proxy(this.store, bh);
    }

    addStore (instance, module) {
        const store = this.getStore();
        const instances = Object.keys(store);
        if (!(instance in instances)) {
            store[instance] = module;
        }

        return new Proxy(store[instance], {
            get: (target, propKey, receiver) => {

                return Reflect.get(target, propKey, receiver);
            },
        });
    }
}
