export default class ConfigMethods {
    initConfig (thisClass, params) {
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
}
