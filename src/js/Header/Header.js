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

export default class Header{
    constructor () {
/*        super(protos, config);
        this.page = new Proxy(protos, this.getProxy());*/
        this.id = 'prova_header';
        this.class = '';
        this.tagName = '';
        this.type = 'Header';
        this.templateUrl = 'templateHeaderHTML.html';
        this.templatePath = '';
    }
/*
    initConfig (thisClass, params) {
        const c = params.config.get("template");
    }

    anotherMethod (thisClass) {
        console.log("hola desde another method Header")
    }

    getId (thisClass, params) {
        const c = params.config.get("template");
        return c.id;
    }

    initTemplate (thisClass, params) {
        thisClass.config.initConfig(thisClass, params);
    }
    
    changeTemplate (thisClass, params) {
        params.obj.DOMObj.innerHTML = params.params;
        
    }

    writeTemplate (thisClass, params) {
        console.log(params.obj.template)
        params.obj.DOMObj.appendChild(params.obj.template);
    }*/
}

// const header = new CatLoadBootstrap('Header', Header);
