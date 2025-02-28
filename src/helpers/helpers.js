import LS from "./localStorage";

const HelpersGeneral = {
    userData: {},
    isAuthorized: function() {
        this.userData = LS.get('userData');
        return !!this.userData?.token;
    },
    renderScript: function(componentId, idScript, scriptCode) {
        document.querySelector(`#${idScript}`)?.remove();

        const textNode = document.createTextNode(scriptCode);
        const script = document.createElement('script');
        script.setAttribute('id', idScript);
        script.appendChild(textNode);
        document.querySelector(`#${componentId}`).appendChild(script);
        setTimeout(_  => document.querySelectorAll('.tooltip').forEach(x => x.remove()), 3000)
    },
    renderTooltips: function(componentId) {
        const scriptId = 'tooltip-script';
        const scriptCode = `
            tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        `;
        this.renderScript(componentId,scriptId,scriptCode);
    },
    renderToasts: function(componentId) {
        const scriptId = 'toast-script';
        const scriptCode = `
            // var option = {};
            toastElList = [].slice.call(document.querySelectorAll('.toast'))
            toastList = toastElList.map(function (toastEl) {
                // return new bootstrap.Toast(toastEl, option)
                return new bootstrap.Toast(toastEl)
            })
        `;
        this.renderScript(componentId,scriptId,scriptCode);
    },
    showToast: function(componentId,mensaje) {
        const scriptCode = `
            toastBodyEl = document.querySelector('.toast-body');
            toastBodyEl.innerText = '${mensaje}';
            toastEl = document.getElementById('toast');
            toastObj = new bootstrap.Toast(toastEl);
            toastObj.show()
        `;
        this.renderScript(componentId,'show-toast-script',scriptCode);
    },

    /** @param args: {componentId, url, method, body, successCodes, success, error, final} */
    jsonRequest: function (args) {
        const {componentId, url, method, body, successCodes, success, error, final} = args;

        const headers = {
            'Content-Type': 'application/json'
        };

        if(this.isAuthorized()) {
            headers['Authorization'] = 'Bearer '+this.userData.token;
        }

        fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null,
            headers
        })
        .then((response) => {
            // console.log('res',response)
            if(!response.ok) return response.text().then(text => { console.log('tex',text);throw new Error(text || `{"Status": "${response.status} ${response.statusText}"}`) })
            else return response.json();
        })
        .then((dataRes) => {
            // console.log('dr',dataRes)
            if(successCodes.includes(dataRes.statusCode)) success(dataRes)
            else throw new Error(JSON.stringify(dataRes))
        })
        .catch(err => {
            console.log('error',err)
            const errData = JSON.parse(err.message);
            this.showToast(componentId,'❌ Ocurrió un error al hacer la petición. '+JSON.stringify(errData.errors || errData))
            if(error) error(err);
        })
        .finally(_ => {
            if(final) final();
        });
    }
};

export default HelpersGeneral;