import {DEBUG} from "../consts";
import {store as localStore} from "../index"
import {updateContact, updateLastRun} from "../redux/actions";

const enrichLocalState = (appReturnedStore) => {
    appReturnedStore = JSON.parse(appReturnedStore);
    localStore.dispatch(updateLastRun(appReturnedStore.lastRun));
    for(let c in appReturnedStore.contacts){
        const contact = appReturnedStore.contacts[c];
        localStore.dispatch(updateContact(contact.id, contact));
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
                enrichLocalState(request.store)
            }
            sendResponse({state: localStorage.getItem('state')});
        });
}