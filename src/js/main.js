import Cat from './common/Cat';
import Page from './Page/Page';
import Utils from './common/utils';

Cat.bootstrap(Page);

/*console.log('---------------------- Paso per aqui--------------------')
import(`./Page/Page`).then((code) => {
    console.log(code)
})*/

document.addEventListener("DOMContentLoaded", (e)=>{
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
    console.log(allModules)
})
