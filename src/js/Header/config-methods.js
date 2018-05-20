export default class ConfigMethods {
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
}
