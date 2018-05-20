
export default class TemplateMethods {
    initTemplate (thisClass, params) {
        thisClass.config.initConfig(thisClass, params);

        /*
         const node = document.importNode(target.template.template.firstChild, true)
        target.DOMObj.appendChild(node);
        */
    }

    changeTemplate (thisClass, params) {
        params.obj.DOMObj.innerHTML = params.params;
    }

    writeTemplate (thisClass, params) {
        console.log(params.obj.template)
        params.obj.DOMObj.appendChild(params.obj.template);
    }

}
