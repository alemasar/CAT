import { event } from './CatEvents';
import Utils from './utils';


export default class CatBootstrap {
    constructor (module) {
        this.module = new Proxy(module, this.getPageProxy());
        this.DOMReady = false;
        this.templateReady = false;
        this.event = new Proxy(event, this.getEventProxy());
        this.store = {};
        this.prova = 'Aun nada';
        this.template = new Map();
        this.init();
    }

    init () {
        this.initModule();
        this.initTemplate();
    }

    initModule () {
        const storeHandler = (storeClass) => {
            this.store = storeClass;
        }
        console.log(this.store);
        Utils.triggerEvent("cat-get-store", {action: storeHandler});

        const templateHandler = (event) => {        
            const template = {...event.detail.template};
            const type = {...event.detail.type};
            this.template.set(type, template);
            this.templateReady = true;
            console.log("Lanzo cat-template-ready "+ event.detail.type)
            Utils.triggerEvent("cat-template-ready", {type: event.detail.type});
        }
        console.log(this.module.constructor.name)
        document.addEventListener("cat-set-template", templateHandler);
    }

    initTemplate () {      
        this.module.page.initLoadTemplate();
        this.module.page.loadTemplate();
    }

    getPageProxy () {
        return {
            get: (target, prop, receiver) => {
                return Reflect.get(target, prop);
            }
        }
    }
    
    getEventProxy () {
        return {
            get: (target, prop, receiver) => {
                return target;
            }
        }
    }

    getInstanceProxy () {
        return {
            get: (target, prop, receiver) => {
                const hola = this.module.page[prop];
                const ref = (value) => {
                    return hola(target, value);
                }
                return ref;
            }
        }
    }
}
