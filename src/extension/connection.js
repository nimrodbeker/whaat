import {DEBUG} from "../consts";
import {store as guiStore} from "../index"
import {setActive, updateContact, updateLastRun} from "../redux/actions";

const enrichLocalState = (injectedStore) => {
    console.log('Enrich', injectedStore);
    if(guiStore.getState().lastRun < injectedStore.lastRun) {
        guiStore.dispatch(updateLastRun(injectedStore.lastRun));
        for (let c in injectedStore.contacts) {
            const contact = injectedStore.contacts[c];
            guiStore.dispatch(updateContact(contact.id, contact));
        }
        guiStore.dispatch(setActive(injectedStore.active));
    }
};
if(window.chrome.runtime.onMessage !== undefined) {
    window.chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            if (DEBUG) {
                //console.log(sender.tab ?
                //    "from a content script:" + sender.tab.url :
                //    "from the extension");
                // console.log(JSON.parse(request.store));
                // console.log(store.getState())
            }
            if (request.store !== undefined && request.store !== null) {
                enrichLocalState(JSON.parse(request.store));
            }
            sendResponse({state: localStorage.getItem('state')});
        });
}