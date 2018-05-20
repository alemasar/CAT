
export default class TemplateMethods {
    initTemplate (thisClass, params) {
        thisClass.config.initConfig(thisClass, params);
    }
    
    changeTemplate (thisClass, params) {
        params.obj.DOMObj.innerHTML = params.params;
        
    }

    writeTemplate (thisClass, params) {
        console.log(params.obj.template)
        params.obj.DOMObj.appendChild(params.obj.template);
    }

}
