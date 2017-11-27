import {createStore} from "redux";
import whatsappController from './reducers'
import {loadState, saveState} from "./localStorage";

export const configureStore = () => {
    const store = createStore(
        whatsappController,                                                          // App Reducer
        loadState(),                                                                 // Initialize State
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Dev Tools
    );
    saveState(store);
    return store;
};