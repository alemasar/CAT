
export const template = (page) => {
    return new Proxy(page, {
        get: (target, propKey, receiver) => {

            return Reflect.get(target, propKey, receiver);
        },
        set: (target, propKey, receiver) => {
            document.querySelector("body").innerHTML = receiver();

            return Reflect.set(target, propKey, receiver);
        }
    });
}