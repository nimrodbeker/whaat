export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return undefined;
    }
};


export const saveState = (store) => {
    // Save on startup.
    localStorage.setItem('state', JSON.stringify(store.getState()));
    // Then subscribe for future changes
    store.subscribe(() => {
        try {
            localStorage.setItem('state', JSON.stringify(store.getState()));
        }
        catch (err) {
            // Nothing currently
        }
    });
};