import Ajax from './ajax';
import Utils from './utils';

const path = document.currentScript && document.currentScript.src;
console.log(document.currentScript.src)

export default class CatLoadTemplate {
    initLoadTemplate (thisClass, params) {
        const c = params.config.get("template");
        this.fileName = c.type+'/template/'+c.url;
        this.type = c.type;
        this.id = c.id;
        this.template = '';
    }

    loadTemplate () {
        Ajax.loadTemplate().
            load(path, this.fileName).
            then((res) => {
                this.template = res.content;
                console.log(this.type)
                Utils.triggerEvent("cat-set-template", {
                    "type": this.type,
                    "template": res.content
                })
            });
    }

    getTemplate () {
        return this.template;
    }
}
