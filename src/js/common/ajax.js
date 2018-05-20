import {Observable} from 'rxjs/Observable';

export default class Ajax {

    static getUrl (url, data) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const config = {
            method: 'GET',
            body: data,
            headers,
            mode: 'cors',
            cache: 'default'
        };


        return new Observable((observer) => {
            fetch(url, config).then((r) => {
                r.json().then((response) => observer.next(response));
            })
        });
    }

    static getXHRUrl (url, data) {


        return Observable.create((observer) => {
            const config = {
                method: 'GET',
                body: data,
                mode: 'cors',
                cache: 'default'
            };

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, config);
            xhr.responseType = 'text';
            xhr.withCredentials = true;

            const readyStateOK = 4;
            const statusOK = 200;

            xhr.onreadystatechange = () => {
                if (xhr.readyState === readyStateOK) {
                    if (xhr.status === statusOK) {
                        const setData = () => {
                            if (xhr.responseType &&
                                xhr.responseType === 'text') {
                                console.log(xhr.response)

                                return xhr.response;
                            }

                            return xhr.responseText;
                        }
                        observer.next(setData());
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }

                return () => {
                    xhr.abort();
                };
            };
            xhr.send();
        });
    }
    static loadTemplate () {
        return Object.create(null, {
            load: {
              value: async (path, fileName) => {
                const url = new URL(fileName, path)
                console.log(this)
                if (url in this) return this[url]
                // fetch and parse template as string
                let template = await fetch(url)
                template = await template.text()
                template = new DOMParser().parseFromString(template, 'text/html')
                  .querySelector('template')
                if (!template) throw new TypeError('No template element found')
                // overwrite link tags' hrefs asuming they're always relative to the template
                for (let link of template.content.querySelectorAll('link')) {
                  let href = document.importNode(link).href
                  href = new URL(href).pathname.substr(1)
                  link.href = new URL(href, url).href
                }
                document.head.append(template)
                this[url] = template
                return template
              }
            }
        })
    }
}
