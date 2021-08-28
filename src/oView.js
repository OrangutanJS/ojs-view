import o, {oRef} from "ojs-core";

class oView {
    constructor(config = {}) {
        this.html = "";
        this.instanceID = config.id ? config.id : `${new Date().getTime()}${Math.floor(Math.random() * 100)}`;
        this.class = config.class || false;
        this.instance = oRef();
    }

    components() {
    }

    build() {
        throw new Error("'Build' method is not implemented");
    }

    fetchData(url, method = 'GET', responseType = 'json') {
        return fetch(url,{method})
        .then(resp => {
            if(responseType === 'json') return resp.json()
            if(responseType === 'blob') return resp.blob()
        })
        .catch(err => console.warn(err));
    }

    rerender = () => {
        try {
            const { target } = this.instance;
            if(!target) {
                return;
            }
            this.components();
            const body = this.build();
            target.innerHTML = "";
            if (body instanceof HTMLElement) {
                target.appendChild(body);
            }
            else {
                body.forEach(el => target.appendChild(el));
            }
        } catch (error) {
            console.warn(error);
        }
    }

    init() {
        this.components();
        const buildContent = this.build();
        if(buildContent.length && buildContent[0] instanceof o) {
            throw new Error("Probably you forgot use .init in build method");
        }
        this.html = o('div').ref(this.instance).id(this.instanceID).add([
            buildContent
        ]);
        this.class && this.html.class(this.class);
        return this.html.init();
    }
}

export default oView;
