import CatStore from './CatStore/CatStore';

export default class Cat {
    static bootstrap(type) {

        // this.store = new CatStore();

        CatStore.addModule(type)
        const protos = new Map();
        const config = new Map();
       // console.log(this.store);
        /*protos.set('template', new TemplateMethods());
        protos.set('config', new ConfigMethods());
        config.set('template', new Config());
        protos.set('load', new CatLoadTemplate());*/
    }
    /*    constructor(prototypes, config){
            this.protos = prototypes;
            this.config = config;
        }
        getProxy () {
            const overrides = {};
    
            return {
                get: (target, propKey, receiver) => {
                    const keys = Array.from(this.protos.keys());
                    let searchedProto = {}
                    keys.forEach((key) => {
                        const prototype = [overrides].
                            concat(this.protos.get(key)).
                            find((proto) => propKey in proto);
    
                        if (prototype) {
                            searchedProto = prototype;
                        }
                    }, this)
    
                    if (searchedProto) {
                        const ref = (obj, params) => {
                            const config = this.config;
                            let param = {config};
                            if (obj) {
                                param.obj = {...obj}
                            }
                            if (params) {
                                param.params = params
                            }
                            return Reflect.apply(
                                searchedProto[propKey],
                                this,
                                [
                                    new Proxy(searchedProto, this.getProxyThis()),
                                    {...param}
                                ]
                            );
                        }
    
                        return ref;
                    }
    
                    return false;
                }
            }
        }
    
        getProxyThis () {
            const overrides = {};
    
            return {
                get: (target, propKey, receiver) => {
                    const keys = Array.from(protos.keys());
                    if (this.protos.has(propKey)) {
    
                        return new Proxy(this.protos.get(propKey), this.getProxy());
                    }
    
    
                    return false;
                }
            }
        }*/
}