// import CatModel from '../common/CatModel';
import CatStore from '../common/CatStore';
// import Utils from '../common/utils';

class Page {
    constructor (config) {

        this.func = config.func;
        // this.page = new CatModel(config.instance, this).proxy;

        // utils.triggerEvent("getModel", {model: this});
    }
}

export const module = (config) => {
    const s = new CatStore();
    const i = s.addStore(config.instance, new Page(config));

    return i;
}
