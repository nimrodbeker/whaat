import {DEBUG} from "../consts";
import {store as guiStore} from "../index"

const enrichLocalState = (actionsQueue) => {
    actionsQueue.map((action)=>{guiStore.dispatch(action)});
};
if(window.chrome.runtime.onMessage !== undefined) {
    window.chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (DEBUG) {
                console.log('Connection Enricher:', request);
            }
            if (request.actions !== undefined && request.actions !== null) {
                enrichLocalState(JSON.parse(request.actions));
            }
            sendResponse({state: localStorage.getItem('state')});
        });
}