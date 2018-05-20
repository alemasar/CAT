import CatStoreEvents from './CatStoreEvents';
import Utils from '../utils';


/* constructor() {
     this.storeEvents = new CatStoreEvents();
     this.storeEvents.initGetEvent();
     this.storeEvents.initSetEvent();
 }*/

/* addModule(type, handler) {

     const setObjHandler = (e) => {
         let modules = new Map();*/
/*const func = function () {
    console.log(this)
    modules = this.modules;
}*/

/*    this.storeEvents.getModules(modules)
    console.log(modules)
   // Utils.triggerEvent('cat-get-store', { action: handler })
    const t = new type();
    modules.set(t.id, type);
    this.storeEvents.setModules(modules)
    //Utils.triggerEvent('cat-set-store', { store: modules });
}
document.addEventListener('set-list', setObjHandler.bind(this));
Utils.triggerEvent('set-list', {  })*/
/*let store;
const getRef = (e) => {
    console.log(this)
    store = this.modules;            
}        
Utils.triggerEvent("cat-get-store", {
    action: getRef
});

const keys = Object.keys(store)
const t = new type()
if (!(t.id in keys)) {

    store.set(t.id, {
        type,
        handler
    });
    Utils.triggerEvent('set-modules', { store });
    this.modules = store;
}*/
// console.log(store)

/*  }


  getModule(id) {

      Utils.triggerEvent("cat-get-store", { action: storeHandler });

      const keys = Object.keys(this.modules)
      const t = new type()
      if ((t.id in keys)) {
          this.modules.set(type, handler);
      }
  }*/


// export let store = new CatStore();


/*const templateReadyRef = (e) => {
    console.log(e);
    let store;
    const storeHandler = (storeClass) => {
        console.log(storeClass)
        store = storeClass;
    }
    Utils.triggerEvent("cat-get-store", {action: storeHandler});
    document.removeEventListener("cat-template-ready", templateReadyRef, false);
    const bc = store.modules.get()
    bc.event.triggerEvent("cat-draw-page", {detail: e.detail});
}
document.addEventListener("cat-template-ready", templateReadyRef);*/

/*
const loadedRef = () => {
    this.bc.prova = 'header';
    store.DOMReady = true;
    Utils.triggerEvent("cat-template-ready", {});
    console.log(loadedRef)
    document.removeEventListener("DOMContentLoaded", loadedRef, false)
}

document.addEventListener("DOMContentLoaded", loadedRef);
*/

const myListOfAddedEvents = new Map();
console.log(document)
const realAddEventListener = document.addEventListener;
let launched = false;
document.addEventListener = function(evtType,fn,cap) {

    if (evtType === 'cat-set-store' || evtType === 'cat-get-store'){
        let allModules = new Map();
        const func = function (e) {
    
            //if (this.size===0){
            //   console.log(dispatchEvents)
            //} 
            allModules = this;
    
            console.log(this.size)
            //if (this.size===0){
            // Utils.triggerEvent('dispatch-event-list', {});
            //}
        }
        Utils.triggerEvent('cat-get-store', { action: func });
        const keys = Object.keys(allModules);
        console.log(launched)
        if (!launched){
            myListOfAddedEvents.set(evtType,{on: this, type: evtType, handler: fn, capture: cap});
            launched = true;
            return realAddEventListener.apply(this, arguments);
        } else {
            document.removeEventListener(evtType, fn, false);
        }
    }else{
        return realAddEventListener.apply(this, arguments);
    }
}

let modules = new Map();
export default class CatStore {
    static addModule (module) {
        let allModules = new Map();
        const func = function (e) {
            const m = new module();
            //if (this.size===0){
            //   console.log(dispatchEvents)
            //} 
            allModules = this;

            allModules.set(m.id, { 'module': m });
            console.log(this.size)
            //if (this.size===0){
            // Utils.triggerEvent('dispatch-event-list', {});
            //}
        }
        Utils.triggerEvent('cat-get-store', { action: func });
        Utils.triggerEvent('cat-set-store', { modules: allModules });
        console.log(allModules)
    }
}

const getObjHandler = function (e) {
    //    console.log(store)
    e.detail.action.call(this);
}
const setObjHandler = function (e) {
    //    console.log(store)

    modules = e.detail.modules;
}

//document.addEventListener('set-modules', getObjHandler.bind(modules));
document.addEventListener('cat-get-store', getObjHandler.bind(modules));
document.addEventListener('cat-set-store', setObjHandler.bind(modules));
