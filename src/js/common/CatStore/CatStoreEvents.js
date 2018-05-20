import Utils from '../utils';

export default class CatStoreEvents {
    constructor () {
        this.store = {};

/*        const listStoreEvents = [];

        const realAddEventListener = document.addEventListener;
        
        document.addEventListener = (evtType, fn, cap) => {
            const events = Object.keys(listStoreEvents);
            console.log("hola")
            if (!(evtType in events)){
                listStoreEvents.push(
                    {on: this, type: evtType, handler: fn, capture: cap}
                );
            }

            if (evtType === 'cat-get-store'){
                console.log("cat-get-store")
            }
       
            return realAddEventListener(this, arguments);
        };*/

    }
    initGetEvent () {
        const getObjHandler = (e) => {
            e.detail.action.call(this.store);
        }
        document.addEventListener('cat-get-store', getObjHandler);
    }

    initSetEvent () {
        const setObjHandler = (e) => {     
            this.store = e.detail.store;
        }
        document.addEventListener('cat-set-store', setObjHandler);
    }

    updateModules(modules){
        /*let keys = [];
        let store;
        const func = () => {
            console.log(this)
            store = this.store;
        }
        Utils.triggerEvent('cat-get-store', { action: func })
        keys = Object.keys(store);
        keys.forEach((key) => {
            console.log(key)
            modules.set(key,store.get(key))
        })*/
    }

    getModules (modules) {
        console.log(this.store);
        this.updateModules(modules)
        console.log(modules);
        Utils.triggerEvent('cat-set-store', { store: modules })
    }
    setModules (modules) {
        // this.store = modules;
        console.log(this.store);
        const func = () => {
            console.log(modules)
            this.store = modules;
        }
        Utils.triggerEvent('cat-set-store', {store: modules})
    }
}
/*
const getObjHandler = (e) => {
    console.log(this)
    e.detail.action.call(this);
}
document.addEventListener('cat-get-store', getObjHandler);*/
