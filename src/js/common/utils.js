export default class Utils {
    static addClass (el, classe) {
        if (el.classList) {
            el.classList.add(classe);
        } else {
            el.className += ' ' + classe;
        }
    }

    static removeClass (el, classe) {
        if (el.classList) {
            el.classList.remove(classe);
        }
        else {
            el.className = el.classe.replace(
                new RegExp('(^|\\b)' +
                    classe.split(' ').join('|') +
                    '(\\b|$)', 'gi'),
                ' '
            );
        }
    }

    static triggerEvent (which, detail) {
        let event = {};
        if (document.createEvent) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(which, true, true, detail);
        } else {
            event = new CustomEvent(which, {detail});
        }
        document.dispatchEvent(event);
    }
    static getProxy(module){
        const mh = {
            get: (target, prop, receiver) => {
                console.log('--------------- GET UTILS ---------------');
                console.log(this);
                console.log(prop);
                //  persistFunc();
        
                return target;
            },
            set: (dummyTarget, trapName) =>{
                console.log('--------------- SET UTILS ---------------');
                console.log(dummyTarget);
                console.log(trapName); 
            }
        }
        const dummy = new Map();
        const bh = new Proxy(dummy, mh);
        return new Proxy(new Map(), mh);
    }
}
