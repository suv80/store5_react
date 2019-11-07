class Tools {
    constructor() {
        console.log(`class Tools.`);
    }

    getUrlParams(str, key) {
        if (arguments.length === 1) {
            key = str;
            str = window.location.href;
        }
        var reg = new RegExp("[^\\w*]" + key + "=([^#&]*)");
        var r = reg.exec(str);

        return r !== null ? decodeURIComponent(r[1]) : null;
    }
}

let getUrlParams = new Tools().getUrlParams;

export default new Tools();
export {getUrlParams};
