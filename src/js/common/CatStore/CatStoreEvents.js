import CatStore from './CatStore';
import Utils from '../utils';

export default class CatStoreEvents extends CatStore{
    constructor () {
        super();
        this.modules = new Map();
        this.initInterceptEvents();
        this.initGetEvent();
        this.initSetEvent();
    }

    initInterceptEvents () {
        const addEventListener = document.addEventListener;
        const launched = [];
        launched['cat-set-store'] = false;
        launched['cat-get-store'] = false;
        document.addEventListener = function(evtType,fn,cap) {
            let launchEvent = false;
            if (evtType === 'cat-set-store' || evtType === 'cat-get-store'){
                /*let allModules = new Map();
                const func = function (e) {  
                    allModules = this;
                }
                Utils.triggerEvent('cat-get-store', { action: func });
                const keys = Object.keys(allModules);*/
console.log(launched)
                if (!launched[evtType]){
                    launched[evtType] = true;
                    launchEvent = true;
                } else {
                    document.removeEventListener(evtType, fn, false);
                }
            }else if (evtType === 'DOMContentLoaded'){
                console.log(evtType)
            }else{
                launchEvent = true;
            }
        
            if (launchEvent){
                console.log(this)
                return addEventListener.apply(this, arguments);
            }
        }   
    }

    initGetEvent () {
        const getObjHandler = (e) => {
            console.log(this.modules)
            e.detail.action.call(this.modules);
        }
        document.addEventListener('cat-get-store', getObjHandler);
    }

    initSetEvent () {
        const setObjHandler = (e) => {
            let allModules = new Map();
            const func = function(e) {
                console.log(this)
                allModules = this;
            }
            Utils.triggerEvent("cat-get-store", { action: func.bind(this.modules) })
            allModules.set(e.detail.module.id, e.detail.module);
            this.modules = allModules;
        }
    
        document.addEventListener('cat-set-store', setObjHandler);
    }

}
/*  
const modules = new Map();

const setObjHandler = (e) => {
    let allModules = new Map();
    const func = function(e) {
        allModules = this;
    }
    Utils.triggerEvent("cat-get-store", { action: func.bind(modules) })
    console.log(allModules);
    allModules.set(e.detail.modules.id, e.detail.modules);
}

document.addEventListener('cat-set-store', setObjHandler);*/
