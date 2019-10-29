class Tools {
    constructor() {
        alert(123);
    }

    getUrlParams(str, key) {
        if (arguments.length == 1) {
            key = str;
            str = window.location.href;
        }
        var reg = new RegExp("[^\\w*]" + key + "=([^#&]*)");
        var r = reg.exec(str);

        return r !== null ? decodeURIComponent(r[1]) : null;
    }
}

export default new Tools();
