import CatBootstrap from './CatBootstrap';
import CatStore from './CatStore';
import Utils from './utils';

export default class CatLoadBootstrap{
    constructor(type,ClassName){
        console.log(ClassName)
        let store;
        const storeHandler = (storeClass) => {
            console.log(storeClass)
            store = storeClass;

            store.addModule(type, new Proxy(new CatBootstrap(new ClassName()), {
                get: (target, prop, receiver) => {
                    if (typeof target[prop] !== 'object') {
                        return target[prop];
                    } else if (prop === 'module') {
                        return Reflect.get(target, prop, receiver);
                    }
            
                    return Reflect.get(target[prop], prop, receiver);
                }
            }));
            Utils.triggerEvent('cat-set-store', { store: store });
            console.log(store);
        }
        
        Utils.triggerEvent("cat-get-store", {action: storeHandler});
        console.log(store.modules.get(type))
        const bc = store.modules.get(type);
        bc.event.addEventListener("cat-draw-page", (e) => {
            console.log(e)
            console.log(bc.module.constructor.name)
        
            if (bc.DOMReady && bc.templateReady && e.detail.type === bc.module.constructor.name) {
                console.log("Header cat-draw-page")
                const id = {...bc.module}.id;
        
                const m = document.body.querySelectorAll("[data-cat-id='" + id + "']");
                const modules = Array.from(m);
        
                modules.forEach((DOMObj) => {
                  //  const id = DOMObj.getAttribute('data-cat-id');
                    const type = DOMObj.getAttribute('data-cat-type');
                    const template = bc.module.page.getTemplate();
        //            const module = bc.module;
        
                    const instance = new Proxy({
                        DOMObj,
                        template
                    }, bc.getInstanceProxy());
                    instance.writeTemplate()
        
                });
            }
        });
        /*        this.bc = new Proxy(new CatBootstrap(new ClassName()), {
            get: (target, prop, receiver) => {
                if (typeof target[prop] !== 'object') {
                    return target[prop];
                } else if (prop === 'module') {
                    return Reflect.get(target, prop, receiver);
                }
        
                return Reflect.get(target[prop], prop, receiver);
            }
        });

        this.bc.event.addEventListener("cat-draw-page", (e) => {
            console.log(e)
            console.log(this.bc.module.constructor.name)
        
            if (this.bc.DOMReady && this.bc.templateReady && e.detail.type === this.bc.module.constructor.name) {
                console.log("Header cat-draw-page")
                const id = {...this.bc.module}.id;
        
                const m = document.body.querySelectorAll("[data-cat-id='" + id + "']");
                const modules = Array.from(m);
        
                modules.forEach((DOMObj) => {
                  //  const id = DOMObj.getAttribute('data-cat-id');
                    const type = DOMObj.getAttribute('data-cat-type');
                    const template = this.bc.module.page.getTemplate();
        //            const module = bc.module;
        
                    const instance = new Proxy({
                        DOMObj,
                        template
                    }, this.bc.getInstanceProxy());
                    instance.writeTemplate()
        
                });
            }
        });*/

    }
    
}
