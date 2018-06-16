/*import Cat from '../common/Cat';
import CatLoadBootstrap from '../common/CatLoadBootstrap';
import CatLoadTemplate from '../common/CatLoadTemplate';
import Config from './config';
import ConfigMethods from './config-methods';
import TemplateMethods from './template/template-methods';

const protos = new Map();
const config = new Map();

protos.set('template', new TemplateMethods());
protos.set('config', new ConfigMethods());
config.set('template', new Config());
protos.set('load', new CatLoadTemplate());*/

export default class Page {
    constructor () {
        this.id = 'prova';
        this.type = 'Page';
        this.url = 'template/templateHTML.html';
//        this.page = new Proxy(protos, this.getProxy());
    }

   /* initConfig (thisClass, params) {
        const c = params.config.get("template");
        //console.log(thisClass.load.initLoadTemplate())
        //thisClass.load.initLoadTemplate(c.url, c.type);
    }

    anotherMethod (thisClass) {
        console.log("hola desde another method")
    }

    getId (thisClass, params) {
        const c = params.config.get("template");
        return c.id;
    }

    initTemplate (thisClass, params) {
        thisClass.config.initConfig(thisClass, params);

       // const node = document.importNode(target.template.template.firstChild, true)
       // target.DOMObj.appendChild(node);
    }

    changeTemplate (thisClass, params) {
        params.obj.DOMObj.innerHTML = params.params;
    }

    writeTemplate (thisClass, params) {
        console.log(params.obj.template)
        params.obj.DOMObj.appendChild(params.obj.template);
    }*/
}
