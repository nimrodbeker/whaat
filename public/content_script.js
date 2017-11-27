const DEBUG = false;
const ExtensionStore = 'ExtensionStore';

const injectScript = (file, node) => {
    const elementToInject = document.getElementsByTagName(node)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    elementToInject.appendChild(script);
};

injectScript(chrome.extension.getURL('/js/injected.js'), 'body');


const syncExtension = () => {
    chrome.runtime.sendMessage({store: sessionStorage.getItem(ExtensionStore)},
        function (response) {
            if (DEBUG) {
                console.log(response);
            }
            if (response !== undefined && response.state !== undefined && response.state !== null) {
                sessionStorage.setItem(ExtensionStore, response.state);
            }
        });
};

syncExtension();
let intervalId = setInterval(() => {
    syncExtension()
}, 3000);