const DEBUG = true;
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
    const injectedStore = localStorage.getItem(ExtensionStore);
    console.log('Sync: App -> Ext', injectedStore);
    chrome.runtime.sendMessage({store: injectedStore},
        function (response) {
            if (DEBUG) {
                console.log(response);
            }
            if (response !== undefined && response.state !== undefined && response.state !== null) {
                if(injectedStore.lastRun < JSON.parse(response.state).lastRun) {
                    localStorage.setItem(ExtensionStore, response.state);
                    console.log('Sync: Ext -> App', response.state);
                }
            }
        });
};

syncExtension();
let intervalId = setInterval(() => {
    syncExtension()
}, 3000);