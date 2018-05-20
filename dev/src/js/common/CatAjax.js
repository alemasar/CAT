import Ajax from './ajax';

export default class MotoAjax {
    constructor (url, data) {
        this.url = url;
        this.data = data;
    }

    get response () {
        return Ajax.getUrl(this.url, this.data);
    }
}
