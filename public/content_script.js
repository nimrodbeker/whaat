const DEBUG = true;
const EXTENSION_STORE = 'EXTENSION_STORE';
const ACTIONS_QUEUE = 'ACTIONS_QUEUE';

const injectScript = (file, node) => {
    const elementToInject = document.getElementsByTagName(node)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    elementToInject.appendChild(script);
};

injectScript(chrome.extension.getURL('/js/injected.js'), 'body');


const syncExtension = () => {
    const injectedStore = localStorage.getItem(EXTENSION_STORE);
    console.log('Sync: App -> Ext', injectedStore);
    chrome.runtime.sendMessage({store: injectedStore, actions: localStorage.getItem(ACTIONS_QUEUE)},
        function (response) {
            if (DEBUG) {
                console.log('Sync: Ext -> App', response);
            }
            if (response !== undefined && response.state !== undefined && response.state !== null) {
                localStorage.setItem(EXTENSION_STORE, response.state);
                localStorage.setItem(ACTIONS_QUEUE, "[]");
            }
        });
};

syncExtension();
let intervalId = setInterval(() => {
    syncExtension()
}, 3000);