
class Event {
    constructor () {
        this.event = new Proxy(new Map(), this.getEventPRoxy());
        this.triggerEvents = new Map();
        this.childrenEvents = new Map()
        this.triggeringParent = '';
    }

    getEventPRoxy () {

        return {
            get: (target, propKey) => {
                const ref = (key, value) => {
                    return Reflect[propKey](target, key, value);
                }

                return ref;
            }
        }
    }

    getEvent () {
        return this.event;
    }

    addEventListener (name, handler) {
        this.event.set(name, handler);
    }

    triggerEvent (name, detail) {
        return new Promise(() => {
            this.event.get(name)(detail)
        })
    }
}


export const event = new Event();

