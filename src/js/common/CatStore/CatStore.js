import Utils from '../utils';

export default class CatStore {
    addModule (module) {
        /*let allModules = new Map();
        const func = function (e) {
            console.log(this)
            allModules = this;
            console.log(allModules)
            allModules.set(module.id, { 'module': module });
        }
        Utils.triggerEvent('cat-get-store', { action: func.bind(allModules) });*/
        console.log("Passo")
        Utils.triggerEvent('cat-set-store', { module });
    }
}
